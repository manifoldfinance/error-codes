import { getError } from '@functions/get-error'

describe('getError<T>(fn: (): unknown) -> T | undefined', () => {
  describe('fn returned', () => {
    it('return undefined', () => {
      const fn = () => 'value'

      const result = getError(fn)

      expect(result).toBeUndefined()
    })
  })

  describe('fn throwed', () => {
    it('return T', () => {
      const customError = new Error('CustomError')
      const fn = () => { throw customError }

      const result = getError(fn)

      expect(result).toBe(customError)
    })
  })
})
