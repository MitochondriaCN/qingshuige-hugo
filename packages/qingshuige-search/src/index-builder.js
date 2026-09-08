import { normalizeText } from "./normalizer.js"
import { tokenize } from "./tokenizer.js"

function parseDate(value) {
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) {
    return { timestamp: Number.NEGATIVE_INFINITY, year: null, month: null, day: null }
  }

  return {
    timestamp: date.getTime(),
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate()
  }
}

function pushToIndex(index, key, docId) {
  const list = index.get(key)
  if (list) list.push(docId)
  else index.set(key, [docId])
}

/**
 * Build all structures required by SearchEngine from a plain Article[].
 */
export function buildIndexes(articles, options = {}) {
  const documents = []
  const authorIndex = new Map()
  const categoryIndex = new Map()
  const bodyIndex = new Map()

  articles.forEach((article, docId) => {
    const normalized = {
      title: normalizeText(article.title),
      author: normalizeText(article.author),
      content: normalizeText(article.content)
    }

    const categories = Array.isArray(article.categories)
      ? article.categories.map(normalizeText).filter(Boolean)
      : []

    const document = {
      docId,
      externalId: article.id ?? docId,
      article,
      normalized,
      date: parseDate(article.date),
      categories
    }

    documents.push(document)

    if (normalized.author) pushToIndex(authorIndex, normalized.author, docId)
    for (const category of categories) pushToIndex(categoryIndex, category, docId)

    const perToken = new Map()
    for (const occurrence of tokenize(article.content, options)) {
      const entry = perToken.get(occurrence.value)
      if (entry) {
        entry.frequency += 1
        entry.positions.push(occurrence.position)
      } else {
        perToken.set(occurrence.value, {
          articleId: docId,
          frequency: 1,
          positions: [occurrence.position]
        })
      }
    }

    for (const [token, posting] of perToken) {
      const list = bodyIndex.get(token)
      if (list) list.push(posting)
      else bodyIndex.set(token, [posting])
    }
  })

  // Article iteration gives ascending docIds, but explicit sorting keeps this
  // invariant safe if index construction changes later.
  for (const list of bodyIndex.values()) {
    list.sort((a, b) => a.articleId - b.articleId)
  }

  return {
    documents,
    authorIndex,
    categoryIndex,
    bodyIndex
  }
}
