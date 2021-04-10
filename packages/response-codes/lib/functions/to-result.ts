import { Result, IResult } from '@classes/result'

export function toResult<X = Error, T = unknown>(fn: () => T): IResult<T, X> {
  try {
    const result = fn()
    return Result.Ok(result)
  } catch (e) {
    return Result.Err(e)
  }
}
