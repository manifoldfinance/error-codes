export interface IOptional<T> {
  isSome(): boolean
  isNone(): boolean

  onSome(callback: (val: T) => void): IOptional<T>
  onNone(callback: () => void): IOptional<T>

  orElse<U>(defaultValue: U): IOptional<T | U>
  map<U>(mapper: (val: T) => U): IOptional<U>
  filter<U extends T = T>(predicate: (val: T) => boolean): IOptional<U>

  get(): T
}

export abstract class Optional {
  static Some<T>(value: T): IOptional<T> {
    return Some.of(value)
  }

  static None(): IOptional<never> {
    return None.of()
  }
}

class Some<T> extends Optional implements IOptional<T> {
  static of<T>(value: T): IOptional<T> {
    return new Some(value)
  }

  #value: T

  private constructor(value: T) {
    super()
    this.#value = value
  }

  isSome(): this is Some<T> {
    return true
  }

  isNone() {
    return false
  }

  onSome(callback: (val: T) => void) {
    callback(this.#value)
    return Some.of(this.#value)
  }

  onNone() {
    return Some.of(this.#value)
  }

  orElse() {
    return Some.of(this.#value)
  }

  map<U>(mapper: (val: T) => U) {
    return Some.of(mapper(this.#value))
  }

  filter<U extends T = T>(predicate: (val: T) => boolean) {
    if (predicate(this.#value)) {
      return Some.of(this.#value) as IOptional<U>
    } else {
      return None.of()
    }
  }

  get() {
    return this.#value
  }
}

class None extends Optional implements IOptional<never> {
  static of(): IOptional<never> {
    return new None()
  }

  private constructor() {
    super()
  }

  isSome() {
    return false
  }

  isNone() {
    return true
  }

  onSome() {
    return None.of()
  }

  onNone(callback: () => void) {
    callback()
    return None.of()
  }

  orElse<T>(defaultValue: T) {
    return Some.of(defaultValue)
  }

  map() {
    return None.of()
  }

  filter() {
    return None.of()
  }

  get(): never {
    throw new Error('Cannot get value from None')
  }
}
