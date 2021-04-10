import { getErrorResult } from '@functions/get-error-result'

describe('getErrorResult<X = Error, T = unknown>(fn: () => T): [undefined, T] | [X, undefined]', () => {
  describe('fn returned', () => {
    it('return [undefined, T]', () => {
      const value = 'value'
      const fn = () => value

      const result = getErrorResult<string>(fn)

      expect(result).toEqual([undefined, value])
    })
  })

  describe('fn throwed', () => {
    it('return [X, undefined]', () => {
      const customError = new Error('CustomError')
      const fn = () => { throw customError }

      const result = getErrorResult<string>(fn)

      expect(result).toEqual([customError, undefined])
    })
  })
})
