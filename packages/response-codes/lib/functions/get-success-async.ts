export async function getSuccessAsync<T>(fn: () => PromiseLike<T> | T): Promise<[succeeded: true, result: T] | [succeeded: false, result: undefined]> {
  try {
    const result = await fn()
    return [true, result]
  } catch {
    return [false, void 0]
  }
}
