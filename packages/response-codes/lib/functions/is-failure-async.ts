export async function isFailureAsync(fn: () => Promise<unknown> | unknown): Promise<boolean> {
  try {
    await fn()
    return false
  } catch {
    return true
  }
}
