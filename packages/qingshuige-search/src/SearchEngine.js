import { buildIndexes } from "./index-builder.js"
import { kmpIndexOf } from "./kmp.js"
import { normalizeText } from "./normalizer.js"
import { parseDateQuery } from "./date-query.js"
import { intersectSorted } from "./set-ops.js"
import { tokenizeQuery } from "./tokenizer.js"

const DEFAULT_OPTIONS = Object.freeze({
  hanGramSize: 2,
  minWordLength: 2,
  maxDocumentFrequencyRatio: 0.6,
  maxResults: 20,
  snippetLength: 110,
  weights: {
    titleExact: 20,
    titlePrefix: 15,
    titleContains: 10,
    authorExact: 8,
    authorContains: 5,
    coverage: 10,
    titlePhrase: 10,
    bodyPhrase: 5
  }
})

function mergeOptions(options) {
  return {
    ...DEFAULT_OPTIONS,
    ...options,
    weights: {
      ...DEFAULT_OPTIONS.weights,
      ...(options.weights ?? {})
    }
  }
}

function postingIds(postingList) {
  return postingList.map((posting) => posting.articleId)
}

function matchesDate(document, dateQuery) {
  if (!dateQuery) return false
  if (document.date.year !== dateQuery.year) return false
  if (dateQuery.month != null && document.date.month !== dateQuery.month) return false
  if (dateQuery.day != null && document.date.day !== dateQuery.day) return false
  return true
}

function makeSnippet(content, position, length) {
  const text = String(content ?? "")
  if (!text.trim()) return ""

  const safePosition = Math.max(0, Math.min(position ?? 0, text.length))
  const half = Math.floor(length / 2)
  const start = Math.max(0, safePosition - half)
  const end = Math.min(text.length, start + length)
  const excerpt = text.slice(start, end).replace(/\s+/gu, " ").trim()

  return `${start > 0 ? "…" : ""}${excerpt}${end < text.length ? "…" : ""}`
}

export class SearchEngine {
  constructor(options = {}) {
    this.options = mergeOptions(options)
    this.articles = []
    this.documents = []
    this.authorIndex = new Map()
    this.categoryIndex = new Map()
    this.bodyIndex = new Map()
  }

  load(articles) {
    if (!Array.isArray(articles)) {
      throw new TypeError("SearchEngine.load expects an Article[]")
    }

    this.articles = articles
    const indexes = buildIndexes(articles, this.options)
    Object.assign(this, indexes)
    return this
  }

  search(query, searchOptions = {}) {
    const normalizedQuery = normalizeText(query)
    if (!normalizedQuery) return []

    const maxResults = searchOptions.limit ?? this.options.maxResults
    const scope = this.#resolveScope(searchOptions.category)
    if (scope && scope.size === 0) return []

    const groups = tokenizeQuery(query, this.options)
    const dateQuery = parseDateQuery(query)
    const candidates = new Map()

    const ensureCandidate = (docId) => {
      if (scope && !scope.has(docId)) return null
      let candidate = candidates.get(docId)
      if (!candidate) {
        candidate = {
          docId,
          titleMatch: null,
          authorMatch: null,
          dateMatch: false,
          bodyGroups: new Set(),
          matchedTokens: new Set(),
          bodyPostings: new Map(),
          phraseInBody: false,
          firstBodyPosition: null
        }
        candidates.set(docId, candidate)
      }
      return candidate
    }

    // Cheap, high-value fields first.
    for (const document of this.documents) {
      if (scope && !scope.has(document.docId)) continue

      const title = document.normalized.title
      if (title === normalizedQuery) {
        ensureCandidate(document.docId).titleMatch = "exact"
      } else if (title.startsWith(normalizedQuery)) {
        ensureCandidate(document.docId).titleMatch = "prefix"
      } else if (title.includes(normalizedQuery)) {
        ensureCandidate(document.docId).titleMatch = "contains"
      }

      if (dateQuery && matchesDate(document, dateQuery)) {
        ensureCandidate(document.docId).dateMatch = true
      }
    }

    const exactAuthorIds = this.authorIndex.get(normalizedQuery) ?? []
    for (const docId of exactAuthorIds) {
      const candidate = ensureCandidate(docId)
      if (candidate) candidate.authorMatch = "exact"
    }

    for (const [author, docIds] of this.authorIndex) {
      if (!author.includes(normalizedQuery) || author === normalizedQuery) continue
      for (const docId of docIds) {
        const candidate = ensureCandidate(docId)
        if (candidate && candidate.authorMatch == null) candidate.authorMatch = "contains"
      }
    }

    this.#recallBody(groups, ensureCandidate)

    const ranked = []
    for (const candidate of candidates.values()) {
      const result = this.#rankCandidate(candidate, groups, normalizedQuery)
      if (result) ranked.push(result)
    }

    ranked.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      const bTime = this.documents[b.documentId]?.date.timestamp ?? Number.NEGATIVE_INFINITY
      const aTime = this.documents[a.documentId]?.date.timestamp ?? Number.NEGATIVE_INFINITY
      return bTime - aTime
    })

    return ranked.slice(0, maxResults)
  }

  #resolveScope(category) {
    if (!category) return null
    const key = normalizeText(category)
    return new Set(this.categoryIndex.get(key) ?? [])
  }

  #recallBody(groups, ensureCandidate) {
    const documentCount = this.documents.length || 1

    groups.forEach((group, groupIndex) => {
      if (!group.bodySearchable || group.tokens.length === 0) return

      const tokenEntries = []
      for (const token of group.tokens) {
        const postings = this.bodyIndex.get(token)
        if (!postings) return // AND semantics inside a single group.

        const ratio = postings.length / documentCount
        if (ratio > this.options.maxDocumentFrequencyRatio) continue
        tokenEntries.push({ token, postings })
      }

      if (tokenEntries.length === 0) return

      // Most selective token first, then intersect ascending posting lists.
      tokenEntries.sort((a, b) => a.postings.length - b.postings.length)
      let ids = postingIds(tokenEntries[0].postings)
      for (let i = 1; i < tokenEntries.length && ids.length > 0; i += 1) {
        ids = intersectSorted(ids, postingIds(tokenEntries[i].postings))
      }

      // Verify the original group phrase with KMP. This removes false positives
      // where all bigrams exist in a document but not as one continuous phrase.
      for (const docId of ids) {
        const document = this.documents[docId]
        const exactPosition = kmpIndexOf(document.normalized.content, group.raw)
        if (exactPosition < 0) continue

        const candidate = ensureCandidate(docId)
        if (!candidate) continue

        candidate.bodyGroups.add(groupIndex)
        candidate.phraseInBody = true

        for (const { token, postings } of tokenEntries) {
          const posting = postings.find((item) => item.articleId === docId)
          if (!posting) continue
          candidate.matchedTokens.add(token)
          candidate.bodyPostings.set(token, posting)
          const position = posting.positions[0]
          if (candidate.firstBodyPosition == null || position < candidate.firstBodyPosition) {
            candidate.firstBodyPosition = position
          }
        }
      }
    })
  }

  #rankCandidate(candidate, groups, normalizedQuery) {
    const document = this.documents[candidate.docId]
    const { weights } = this.options
    let score = 0

    if (candidate.titleMatch === "exact") score += weights.titleExact
    else if (candidate.titleMatch === "prefix") score += weights.titlePrefix
    else if (candidate.titleMatch === "contains") score += weights.titleContains

    if (candidate.authorMatch === "exact") score += weights.authorExact
    else if (candidate.authorMatch === "contains") score += weights.authorContains

    const searchableGroups = groups.filter((group) => group.bodySearchable)
    const matchedGroupCount = candidate.bodyGroups.size
    const coverage = searchableGroups.length > 0
      ? matchedGroupCount / searchableGroups.length
      : 0
    score += coverage * weights.coverage

    for (const [token, posting] of candidate.bodyPostings) {
      const documentFrequency = this.bodyIndex.get(token)?.length ?? 0
      const tf = 1 + Math.log(posting.frequency)
      const idf = Math.log((this.documents.length + 1) / (documentFrequency + 1)) + 1
      score += tf * idf
    }

    const phraseInTitle = normalizedQuery.length > 0
      && kmpIndexOf(document.normalized.title, normalizedQuery) >= 0
    if (phraseInTitle) score += weights.titlePhrase
    if (candidate.phraseInBody) score += weights.bodyPhrase

    // Date is a structured query/filter signal, not a general relevance boost.
    // A date-only query still needs a non-zero score to surface its candidates.
    if (candidate.dateMatch && score === 0) score = 1

    if (score <= 0) return null

    const snippetPosition = candidate.firstBodyPosition
      ?? Math.max(0, kmpIndexOf(document.normalized.content, normalizedQuery))

    return {
      article: document.article,
      documentId: document.docId,
      externalId: document.externalId,
      score,
      coverage,
      matchedFields: {
        title: candidate.titleMatch,
        author: candidate.authorMatch,
        date: candidate.dateMatch,
        body: candidate.bodyGroups.size > 0
      },
      matchedTokens: [...candidate.matchedTokens],
      snippet: makeSnippet(document.article.content, snippetPosition, this.options.snippetLength)
    }
  }
}
