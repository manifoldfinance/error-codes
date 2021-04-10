export function getFailure<X = Error>(fn: () => unknown): [failed: true, error: X] | [faled: false, error: undefined] {
  try {
    fn()
    return [false, void 0]
  } catch (e) {
    return [true, e]
  }
}
