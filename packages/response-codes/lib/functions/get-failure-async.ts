export async function getFailureAsync<X = Error>(fn: () => PromiseLike<unknown> | unknown): Promise<[failed: true, error: X] | [failed: false, error: undefined]> {
  try {
    await fn()
    return [false, void 0]
  } catch (e) {
    return [true, e]
  }
}
