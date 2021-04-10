import { getFailurePromise } from '@functions/get-failure-promise'
import ' /jest-matchers'

describe('getFailurePromise<X = Error>(promise: PromiseLike<unknown>): Promise<[true, X] | [false, undefined]>', () => {
  describe('promise resolved', () => {
    it('return Promise<[false, undefined]>', async () => {
      const value = 'value'
      const promise = Promise.resolve(value)

      const result = getFailurePromise(promise)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toEqual([false, undefined])
    })
  })

  describe('promise rejected', () => {
    it('return Promise<[true, X]>', async () => {
      const customError = new Error('CustomError')
      const promise = Promise.reject(customError)

      const result = getFailurePromise(promise)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toEqual([true, customError])
    })
  })
})
