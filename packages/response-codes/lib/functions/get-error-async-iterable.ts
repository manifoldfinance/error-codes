export async function getErrorAsyncIterable<X = Error>(iterable: AsyncIterable<unknown>): Promise<X | undefined> {
  try {
    for await (const _ of iterable) {}
  } catch (promiseError) {
    return promiseError
  }
  return
}
