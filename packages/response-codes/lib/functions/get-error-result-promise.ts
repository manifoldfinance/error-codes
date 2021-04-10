export async function getErrorResultPromise<X = Error, T = unknown>(promise: PromiseLike<T>): Promise<[error: undefined, result: T] | [error: X, result: undefined]> {
  try {
    const result = await promise
    return [void 0, result]
  } catch (e) {
    return [e, void 0]
  }
}
