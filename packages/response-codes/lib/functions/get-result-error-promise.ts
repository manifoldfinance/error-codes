export async function getResultErrorPromise<X = Error, T = unknown>(promise: PromiseLike<T>): Promise<[result: T, error: undefined] | [result: undefined, error: X]> {
  try {
    const result = await promise
    return [result, void 0]
  } catch (e) {
    return [void 0, e]
  }
}
