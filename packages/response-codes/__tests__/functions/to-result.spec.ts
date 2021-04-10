import { Result } from '@classes/result'
import { toResult } from '@functions/to-result'
import 'jest-extended'

describe('toResult<X = Error, T = unknown>(fn: () => T): IResult<T, X>', () => {
  describe('fn throw error', () => {
    it('return Result.Err', () => {
      const fn = () => { throw new Error() }

      const result = toResult<boolean>(fn)
      const isErr = result.isErr()

      expect(result).toBeInstanceOf(Result)
      expect(isErr).toBeTrue()
    })
  })

  describe('fn return result', () => {
    it('return Result.Ok', () => {
      const fn = () => true

      const result = toResult<boolean>(fn)
      const isOk = result.isOk()

      expect(result).toBeInstanceOf(Result)
      expect(isOk).toBeTrue()
    })
  })
})
