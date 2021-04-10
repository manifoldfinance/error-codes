export async function getResultErrorAsync<X = Error, T = unknown>(fn: () => PromiseLike<T> | T): Promise<[result: T, error: undefined] | [result: undefined, error: X]> {
  try {
    const result = await fn()
    return [result, void 0]
  } catch (e) {
    return [void 0, e]
  }
}
