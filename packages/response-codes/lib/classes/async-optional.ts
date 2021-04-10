import { go } from '../go'
import { IOptional, Optional } from './optional'

export const Nil = Symbol()

export interface IAsyncOptional<T> extends PromiseLike<IOptional<T>> {
  onSome(callback: (val: T) => void): IAsyncOptional<T>
  onNone(callback: () => void): IAsyncOptional<T>

  isSome(): Promise<boolean>
  isNone(): Promise<boolean>

  orElse<U>(defaultValue: U): IAsyncOptional<T | U>
  map<U>(mapper: (val: T) => U): IAsyncOptional<U>
  filter<U extends T = T>(predicate: (val: T) => boolean): IAsyncOptional<U>

  get(): Promise<T>
}

export class AsyncOptional<T> implements IAsyncOptional<T> {
  static Some<T>(value: T): IAsyncOptional<T> {
    return AsyncSome.of(value)
  }

  static None(): IAsyncOptional<never> {
    return AsyncNone.of()
  }

  #promise: PromiseLike<T | typeof Nil>

  get then() {
    const promise = this.#promise.then(x =>
      x === Nil
      ? Optional.None()
      : Optional.Some(x)
    ) as PromiseLike<IOptional<T>>

    return promise.then.bind(promise)
  }

  constructor(promise: PromiseLike<T | typeof Nil> | T | typeof Nil) {
    this.#promise = Promise.resolve(promise)
  }

  onSome(callback: (val: T) => void): IAsyncOptional<T> {
    go(async () => {
      const result = await this.#promise
      if (result !== Nil) callback(result)
    })

    return new AsyncOptional(this.#promise)
  }

  onNone(callback: () => void): IAsyncOptional<T> {
    go(async () => {
      const result = await this.#promise
      if (result === Nil) callback()
    })

    return new AsyncOptional(this.#promise)
  }

  async isSome(): Promise<boolean> {
    const result = await this.#promise
    return result !== Nil
  }

  async isNone(): Promise<boolean> {
    const result = await this.#promise
    return result === Nil
  }

  orElse<U>(defaultValue: U): IAsyncOptional<T | U> {
    const promise = go(async () => {
      const result = await this.#promise
      if (result === Nil) return defaultValue
      return result
    })

    return new AsyncOptional<T | U>(promise)
  }

  map<U>(mapper: (val: T) => U): IAsyncOptional<U> {
    const promise = go(async () => {
      const result = await this.#promise
      if (result === Nil) return Nil
      return mapper(result)
    })

    return new AsyncOptional<U>(promise)
  }

  filter<U extends T = T>(predicate: (val: T) => boolean): IAsyncOptional<U> {
    const promise = go(async () => {
      const result = await this.#promise
      if (result === Nil) return Nil
      if (predicate(result)) return result as U
      return Nil
    })

    return new AsyncOptional<U>(promise)
  }

  async get(): Promise<T> {
    const result = await this.#promise
    if (result === Nil) throw new Error('Cannot get value from None')
    return result
  }
}

class AsyncNone extends AsyncOptional<never> implements IAsyncOptional<never> {
  static of(): IAsyncOptional<never> {
    return new AsyncNone()
  }

  private constructor() {
    super(Promise.resolve(Nil))
  }
}

class AsyncSome<T> extends AsyncOptional<T> implements IAsyncOptional<T> {
  static of<T>(value: T): IAsyncOptional<T> {
    return new AsyncSome(value)
  }

  private constructor(value: T) {
    super(Promise.resolve(value))
  }
}
