import { getSuccess } from '@functions/get-success'

describe('getSuccess<T>(fn: () => T): [true, T] | [false, undefined]', () => {
  describe('fn returned', () => {
    it('return [true, T]', () => {
      const value = 'value'
      const fn = () => value

      const result = getSuccess(fn)

      expect(result).toEqual([true, value])
    })
  })

  describe('fn throwed', () => {
    it('return [false, undefined]', () => {
      const customError = new Error('CustomError')
      const fn = () => { throw customError }

      const result = getSuccess(fn)

      expect(result).toEqual([false, undefined])
    })
  })
})
