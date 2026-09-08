/**
 * Intersect two ascending integer arrays using the classic two-pointer method.
 * Complexity: O(a.length + b.length).
 */
export function intersectSorted(a, b) {
  const out = []
  let i = 0
  let j = 0

  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      out.push(a[i])
      i += 1
      j += 1
    } else if (a[i] < b[j]) {
      i += 1
    } else {
      j += 1
    }
  }

  return out
}

/** Union ascending integer arrays into a new ascending array. */
export function unionSorted(a, b) {
  const out = []
  let i = 0
  let j = 0

  while (i < a.length || j < b.length) {
    const av = i < a.length ? a[i] : Infinity
    const bv = j < b.length ? b[j] : Infinity
    const value = Math.min(av, bv)

    if (out.at(-1) !== value) out.push(value)
    if (av === value) i += 1
    if (bv === value) j += 1
  }

  return out
}
