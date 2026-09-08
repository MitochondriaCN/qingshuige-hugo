import { normalizeText } from "./normalizer.js"

const SEGMENT_RE = /\p{Script=Han}+|[\p{L}\p{N}]+(?:[-_.][\p{L}\p{N}]+)*/gu
const HAN_RE = /^\p{Script=Han}+$/u

/**
 * Split body text into searchable token occurrences.
 *
 * Rules:
 * - Han text: sliding bigrams; a single Han character is intentionally ignored.
 * - Other letters/digits: keep contiguous words/model numbers as one token.
 * - punctuation/whitespace: boundaries.
 *
 * Position is a UTF-16 offset in the original input. It is suitable for
 * extracting browser-side snippets from normal Chinese/Latin prose.
 */
export function tokenize(text, options = {}) {
  const {
    hanGramSize = 2,
    minWordLength = 2
  } = options

  if (hanGramSize < 2) {
    throw new RangeError("hanGramSize must be >= 2")
  }

  const input = String(text ?? "")
  const occurrences = []

  for (const match of input.matchAll(SEGMENT_RE)) {
    const raw = match[0]
    const start = match.index ?? 0

    if (HAN_RE.test(raw)) {
      const chars = Array.from(raw)
      if (chars.length < hanGramSize) continue

      // Compute UTF-16 offsets so snippet positions map back to the original string.
      const offsets = []
      let offset = 0
      for (const char of chars) {
        offsets.push(offset)
        offset += char.length
      }

      for (let i = 0; i <= chars.length - hanGramSize; i += 1) {
        const value = normalizeText(chars.slice(i, i + hanGramSize).join(""))
        occurrences.push({ value, position: start + offsets[i] })
      }
      continue
    }

    const value = normalizeText(raw)
    if (Array.from(value).length < minWordLength) continue
    occurrences.push({ value, position: start })

    // Versioned technical words are searchable by both exact form and base name:
    // vue3 -> vue3 + vue, gpt-5 -> gpt-5 + gpt. Model numbers beginning
    // with digits (e.g. 74HC193) stay exact to avoid noisy aliases.
    const versioned = value.match(/^(\p{L}{2,})[-_.]?\d+$/u)
    if (versioned) occurrences.push({ value: versioned[1], position: start })
  }

  return occurrences
}

/**
 * Parse a user query into logical groups.
 * Tokens inside one Han group are AND-ed; separate groups are OR-ed during
 * candidate recall. Example: "计算机 Hugo" -> [["计算", "算机"], ["hugo"]].
 */
export function tokenizeQuery(query, options = {}) {
  const {
    hanGramSize = 2,
    minWordLength = 2
  } = options

  const input = String(query ?? "")
  const groups = []

  for (const match of input.matchAll(SEGMENT_RE)) {
    const raw = match[0]
    const normalized = normalizeText(raw)

    if (HAN_RE.test(raw)) {
      const chars = Array.from(normalized)
      if (chars.length < hanGramSize) {
        groups.push({ raw: normalized, tokens: [], bodySearchable: false, type: "han" })
        continue
      }

      const tokens = []
      for (let i = 0; i <= chars.length - hanGramSize; i += 1) {
        tokens.push(chars.slice(i, i + hanGramSize).join(""))
      }
      groups.push({ raw: normalized, tokens, bodySearchable: true, type: "han" })
      continue
    }

    const bodySearchable = Array.from(normalized).length >= minWordLength
    groups.push({
      raw: normalized,
      tokens: bodySearchable ? [normalized] : [],
      bodySearchable,
      type: "word"
    })
  }

  return groups
}
