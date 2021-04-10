import { AsyncResult, IAsyncResult } from '@classes/async-result'

export function toResultPromise<X = Error, T = unknown>(promise: PromiseLike<T>): IAsyncResult<T, X> {
  return new AsyncResult<T, X>(promise)
}
