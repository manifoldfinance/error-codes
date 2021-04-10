import { isSuccess } from '@functions/is-success'
import 'jest-extended'

describe('isSuccess(fn: () => unknown): boolean', () => {
  describe('fn returned', () => {
    it('return true', () => {
      const fn = () => {}

      const result = isSuccess(fn)

      expect(result).toBeTrue()
    })
  })

  describe('fn throwed', () => {
    it('return false', () => {
      const fn = () => { throw new Error() }

      const result = isSuccess(fn)

      expect(result).toBeFalse()
    })
  })
})
