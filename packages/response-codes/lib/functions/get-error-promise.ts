export async function getErrorPromise<X = Error>(promise: PromiseLike<unknown>): Promise<X | undefined> {
  try {
    await promise
  } catch (err) {
    return err
  }
  return
}
