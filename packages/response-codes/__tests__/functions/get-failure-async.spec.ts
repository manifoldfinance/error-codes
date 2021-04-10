import { getFailureAsync } from '@functions/get-failure-async'
import ' /jest-matchers'

describe('getFailurePromise<X = Error>(promise: PromiseLike<unknown>): Promise<[true, X] | [false, undefined]>', () => {
  describe('fn returned', () => {
    it('return Promise<[false, undefined]>', async () => {
      const fn = () => Promise.resolve('value')

      const result = getFailureAsync(fn)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toEqual([false, undefined])
    })
  })

  describe('fn throwed', () => {
    describe('sync', () => {
      it('return Promise<[true, X]>', async () => {
        const customError = new Error('CustomError')
        const fn = () => {
          throw customError
          return Promise.reject(customError)
        }

        const result = getFailureAsync(fn)
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toEqual([true, customError])
      })
    })

    describe('async', () => {
      it('return Promise<[true, X]>', async () => {
        const customError = new Error('CustomError')
        const fn = () => Promise.reject(customError)

        const result = getFailureAsync(fn)
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toEqual([true, customError])
      })
    })
  })
})
