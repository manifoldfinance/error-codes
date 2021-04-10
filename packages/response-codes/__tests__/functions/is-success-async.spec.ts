import { isSuccessAsync } from '@functions/is-success-async'
import 'jest-extended'
import ' /jest-matchers'

describe('isSuccessAsync(fn: () => PromiseLike<unknown>): Promise<boolean>', () => {
  describe('fn returned', () => {
    it('return Promise<true>', async () => {
      const fn = () => Promise.resolve()

      const result = isSuccessAsync(fn)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBeTrue()
    })
  })

  describe('fn throwed', () => {
    describe('sync', () => {
      it('return Promise<false>', async () => {
        const fn = () => {
          throw new Error()
          return Promise.reject()
        }

        const result = isSuccessAsync(fn)
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toBeFalse()
      })
    })

    describe('async', () => {
      it('return Promise<false>', async () => {
        const fn = () => Promise.reject()

        const result = isSuccessAsync(fn)
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toBeFalse()
      })
    })
  })
})
