export function getResultError<X = Error, T = unknown>(fn: () => T): [result: T, error: undefined] | [result: undefined, error: X] {
  try {
    const result = fn()
    return [result, void 0]
  } catch (e) {
    return [void 0, e]
  }
}
