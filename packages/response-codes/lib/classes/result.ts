export interface IResult<T, X> {
  isOk(): boolean
  isErr(): boolean

  onOk(callback: (val: T) => void): IResult<T, X>
  onErr(callback: (err: X) => void): IResult<T, X>

  orElse<U>(defaultValue: U): IResult<T, never> | IResult<U, never>
  map<U>(mapper: (val: T) => U): IResult<U, X>

  get(): T
}

export abstract class Result {
  static Ok<T>(value: T): IResult<T, never> {
    return Ok.of(value)
  }

  static Err<T>(error: T): IResult<never, T> {
    return Err.of(error)
  }
}

class Ok<T> extends Result implements IResult<T, never> {
  static of<T>(value: T): IResult<T, never> {
    return new Ok(value)
  }

  #value: T

  private constructor(value: T) {
    super()
    this.#value = value
  }

  isOk() {
    return true
  }

  isErr() {
    return false
  }

  onOk(callback: (val: T) => void) {
    callback(this.#value)
    return Ok.of(this.#value)
  }

  onErr() {
    return Ok.of(this.#value)
  }

  orElse() {
    return Ok.of(this.#value)
  }

  map<U>(fn: (val: T) => U) {
    return Ok.of(fn(this.#value))
  }

  get(): T {
    return this.#value
  }
}

class Err<T> extends Result implements IResult<never, T> {
  static of<T>(error: T): IResult<never, T> {
    return new Err(error)
  }

  #value: T

  private constructor(err: T) {
    super()
    this.#value = err
  }

  isOk() {
    return false
  }

  isErr() {
    return true
  }

  onOk(): IResult<never, T> {
    return Err.of(this.#value)
  }

  onErr(callback: (err: T) => void) {
    callback(this.#value)
    return Err.of(this.#value)
  }

  orElse<U>(defaultValue: U) {
    return Ok.of(defaultValue)
  }

  map(): IResult<never, T> {
    return Err.of(this.#value)
  }

  get(): never {
    throw this.#value
  }
}
