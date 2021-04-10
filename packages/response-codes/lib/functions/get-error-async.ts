export async function getErrorAsync<X = Error>(fn: () => PromiseLike<unknown> | unknown): Promise<X | undefined> {
  try {
    await fn()
  } catch (err) {
    return err
  }
  return
}
