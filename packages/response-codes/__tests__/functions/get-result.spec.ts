import { getResult } from '@functions/get-result'

describe('getResult<T>(fn: () => T): T | undefined', () => {
  describe('fn returned', () => {
    it('return T', () => {
      const value = 'value'
      const fn = () => value

      const result = getResult(fn)

      expect(result).toBe(value)
    })
  })

  describe('fn throwed', () => {
    it('return undefined', () => {
      const fn = () => { throw new Error() }

      const result = getResult(fn)

      expect(result).toBeUndefined()
    })
  })
})
