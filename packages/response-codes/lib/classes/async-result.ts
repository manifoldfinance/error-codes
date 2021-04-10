import { go } from ' /go'
import { IResult, Result } from './result'
import { getSuccessPromise } from '@functions/get-success-promise'
import { getFailurePromise } from '@functions/get-failure-promise'
import { isSuccessPromise } from '@functions/is-success-promise'
import { isFailurePromise } from '@functions/is-failure-promise'

export interface IAsyncResult<T, X> extends PromiseLike<IResult<T, X>> {
  onOk(callback: (val: T) => void): IAsyncResult<T, X>
  onErr(callback: (err: X) => void): IAsyncResult<T, X>

  isOk(): Promise<boolean>
  isErr(): Promise<boolean>

  orElse<U>(defaultValue: U): IAsyncResult<T | U, never>
  map<U>(mapper: (val: T) => U): IAsyncResult<U, X>

  get(): Promise<T>
}

export class AsyncResult<T, X> implements IAsyncResult<T, X> {
  static Ok<T>(value: T): IAsyncResult<T, never> {
    return AsyncOk.of(value)
  }

  static Err<T>(error: T): IAsyncResult<never, T> {
    return AsyncErr.of(error)
  }

  #promise: PromiseLike<T>

  get then() {
    const promise = this.#promise.then(
      x => Result.Ok(x)
    , x => Result.Err(x)
    ) as PromiseLike<IResult<T, X>>

    return promise.then.bind(promise)
  }

  constructor(promise: PromiseLike<T> | T) {
    this.#promise = Promise.resolve(promise)
  }

  onOk(callback: (val: T) => void): IAsyncResult<T, X> {
    go(async () => {
      const [succ, ret] = await getSuccessPromise<T>(this.#promise)
      if (succ) callback(ret as T)
    })

    return new AsyncResult(this.#promise)
  }

  onErr(callback: (err: X) => void): IAsyncResult<T, X> {
    go(async () => {
      const [fail, err] = await getFailurePromise<X>(this.#promise)
      if (fail) callback(err as X)
    })

    return new AsyncResult(this.#promise)
  }

  async isOk(): Promise<boolean> {
    return await isSuccessPromise(this.#promise)
  }

  async isErr(): Promise<boolean> {
    return await isFailurePromise(this.#promise)
  }

  orElse<U>(defaultValue: U): IAsyncResult<T | U, never> {
    const promise = go(async () => {
      try {
        return await this.#promise
      } catch {
        return defaultValue
      }
    })

    return new AsyncResult(promise)
  }

  map<U>(mapper: (val: T) => U): IAsyncResult<U, X> {
    const promise = go(async () => {
      const result = await this.#promise
      return mapper(result as T)
    })

    return new AsyncResult(promise)
  }

  async get(): Promise<T> {
    return await this.#promise
  }
}

class AsyncOk<T> extends AsyncResult<T, never> implements IAsyncResult<T, never> {
  static of<T>(value: T): IAsyncResult<T, never> {
    return new AsyncOk(value)
  }

  private constructor(value: T) {
    super(Promise.resolve(value))
  }
}

class AsyncErr<T> extends AsyncResult<never, T> implements IAsyncResult<never, T> {
  static of<T>(value: T): IAsyncResult<never, T> {
    return new AsyncErr(value)
  }

  private constructor(err: T) {
    super(Promise.reject(err))
  }
}
