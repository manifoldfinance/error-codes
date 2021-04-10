import { Result } from '@src/classes/result'
import 'jest-extended'

describe('Result', () => {
  describe('Ok<T>(value: T): IResult<T, never>', () => {
    it('return Ok', () => {
      const value = 'value'

      const result = Result.Ok(value)
      const isOk = result.isOk()

      expect(result).toBeInstanceOf(Result)
      expect(isOk).toBeTrue()
    })
  })

  describe('Err<X>(error: X): IResult<never, X>', () => {
    it('return Err', () => {
      const error = 'error'

      const result = Result.Err(error)
      const isErr = result.isErr()

      expect(result).toBeInstanceOf(Result)
      expect(isErr).toBeTrue()
    })
  })
})
