export async function getResultAsync<T>(fn: () => PromiseLike<T> | T): Promise<T | undefined> {
  try {
    return await fn()
  } catch {
    return undefined
  }
}
