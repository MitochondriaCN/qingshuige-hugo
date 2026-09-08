/**
 * Parse only explicit date-like queries. Mixed natural-language text is not
 * silently interpreted as a date.
 */
export function parseDateQuery(query) {
  const q = String(query ?? "").trim()

  let match = q.match(/^(\d{4})$/u)
  if (match) return { year: Number(match[1]) }

  match = q.match(/^(\d{4})[-/.年](\d{1,2})(?:月)?$/u)
  if (match) {
    return { year: Number(match[1]), month: Number(match[2]) }
  }

  match = q.match(/^(\d{4})[-/.年](\d{1,2})[-/.月](\d{1,2})(?:日)?$/u)
  if (match) {
    return {
      year: Number(match[1]),
      month: Number(match[2]),
      day: Number(match[3])
    }
  }

  return null
}
