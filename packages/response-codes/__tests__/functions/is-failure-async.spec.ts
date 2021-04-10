import { isFailureAsync } from '@functions/is-failure-async'
import 'jest-extended'
import ' /jest-matchers'

describe('isFailureAsync(fn: () => PromiseLike<unknown>): Promise<boolean>', () => {
  describe('fn returned', () => {
    it('return Promise<false>', async () => {
      const fn = () => Promise.resolve()

      const result = isFailureAsync(fn)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBeFalse()
    })
  })

  describe('fn throwed', () => {
    describe('sync', () => {
      it('return Promise<true>', async () => {
        const fn = () => {
          throw new Error()
          return Promise.reject()
        }

        const result = isFailureAsync(fn)
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toBeTrue()
      })
    })

    describe('async', () => {
      it('return Promise<true>', async () => {
        const fn = () => Promise.reject()

        const result = isFailureAsync(fn)
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toBeTrue()
      })
    })
  })
})
