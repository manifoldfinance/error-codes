import { isFailure } from '@functions/is-failure'
import 'jest-extended'

describe('isFailure(fn: () => unknown): boolean', () => {
  describe('fn returned', () => {
    it('return false', () => {
      const fn = () => {}

      const result = isFailure(fn)

      expect(result).toBeFalse()
    })
  })

  describe('fn throwed', () => {
    it('return true', () => {
      const fn = () => { throw new Error() }

      const result = isFailure(fn)

      expect(result).toBeTrue()
    })
  })
})
