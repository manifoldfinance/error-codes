import { AsyncResult, IAsyncResult } from '@classes/async-result'

export function toResultAsync<X = Error, T = unknown>(fn: () => PromiseLike<T> | T): IAsyncResult<T, X> {
  try {
    const result = fn()
    return new AsyncResult(result)
  } catch (e) {
    return AsyncResult.Err(e)
  }
}
