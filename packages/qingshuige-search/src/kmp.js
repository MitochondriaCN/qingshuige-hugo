/** Build the LPS (longest proper prefix which is also suffix) table. */
export function buildLps(pattern) {
  const lps = new Array(pattern.length).fill(0)
  let length = 0
  let i = 1

  while (i < pattern.length) {
    if (pattern[i] === pattern[length]) {
      length += 1
      lps[i] = length
      i += 1
    } else if (length > 0) {
      length = lps[length - 1]
    } else {
      i += 1
    }
  }

  return lps
}

/** Return the first exact substring match, or -1. */
export function kmpIndexOf(text, pattern) {
  if (pattern.length === 0) return 0
  if (text.length === 0 || pattern.length > text.length) return -1

  const lps = buildLps(pattern)
  let i = 0
  let j = 0

  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i += 1
      j += 1
      if (j === pattern.length) return i - j
    } else if (j > 0) {
      j = lps[j - 1]
    } else {
      i += 1
    }
  }

  return -1
}
