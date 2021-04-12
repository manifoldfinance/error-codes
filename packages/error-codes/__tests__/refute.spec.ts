import { refute } from '@src/refute'
import { ExpectedError } from '@src/expected-error'
import { getError } from 'return-style'

describe('refute(condition: unknown, message?: string): void', () => {
  describe('condition is true', () => {
    it('throw ExepectedError', () => {
      const message = 'message'
      const val: number | null = null

      const err = getError(() => refute(val === null, message))

      expect(err).toBeInstanceOf(ExpectedError)
      expect(err!.message).toBe(message)
    })
  })

  describe('condition is false', () => {
    it('pass', () => {
      const val: number | null = null

      refute(typeof val === 'number')
    })
  })
})
