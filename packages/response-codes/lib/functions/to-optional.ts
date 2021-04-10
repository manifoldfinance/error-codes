import { Optional, IOptional } from '@classes/optional'

export function toOptionalPartial<T>(isNone: (val: T) => boolean): (fn: () => T) => IOptional<T> {
  return (fn: () => T) => toOptional(fn, isNone)
}

export function toOptional<T = unknown>(fn: () => T, isNone: (val: T) => boolean): IOptional<T> {
  const result = fn()
  if (isNone(result)) {
    return Optional.None()
  } else {
    return Optional.Some(result)
  }
}
