export async function isSuccessAsync(fn: () => PromiseLike<unknown> | unknown): Promise<boolean> {
  try {
    await fn()
    return true
  } catch {
    return false
  }
}
