import { go } from '../go'
import { AsyncOptional, IAsyncOptional, Nil } from '@classes/async-optional'

export function toOptionalPromisePartial<T>(isNone: (val: T) => boolean): (promise: PromiseLike<T>) => IAsyncOptional<T> {
  return (promise: PromiseLike<T>) => toOptionalPromise(promise, isNone)
}

export function toOptionalPromise<T>(promise: PromiseLike<T>, isNone: (val: T) => boolean): IAsyncOptional<T> {
  return new AsyncOptional<T>(go(async () => {
    const result = await promise
    if (isNone(result)) return Nil
    return result
  }))
}
