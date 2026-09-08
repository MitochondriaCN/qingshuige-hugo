/**
 * Normalize text for search comparisons without mutating display text.
 */
export function normalizeText(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .toLocaleLowerCase()
    .replace(/[\s\u00a0]+/gu, " ")
    .trim()
}
