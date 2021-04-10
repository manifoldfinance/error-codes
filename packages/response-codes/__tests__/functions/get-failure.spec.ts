import { getFailure } from '@functions/get-failure'

describe('getFailure<X = Error>(fn: () => unknown): [true, X] | [false, undefined]', () => {
  describe('fn returned', () => {
    it('return [false, undefined]', () => {
      const value = 'value'
      const fn = () => value

      const result = getFailure(fn)

      expect(result).toEqual([false, undefined])
    })
  })

  describe('fn throwed', () => {
    it('return [true, X]', () => {
      const customError = new Error('CustomError')
      const fn = () => { throw customError }

      const result = getFailure(fn)

      expect(result).toEqual([true, customError])
    })
  })
})
