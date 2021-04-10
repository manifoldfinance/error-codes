import { getSuccessPromise } from '@functions/get-success-promise'
import ' /jest-matchers'

describe('getSuccessPromise<T>(promise: PromiseLike<T>): Promise<[true, T] | [false, undefined]>', () => {
  describe('promise resolved', () => {
    it('return Promise<[true, T]>', async () => {
      const value = 'value'
      const promise = Promise.resolve(value)

      const result = getSuccessPromise(promise)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toEqual([true, value])
    })
  })

  describe('promise rejected', () => {
    it('return Promise<[false, undefined]>', async () => {
      const customError = new Error('CustomError')
      const promise = Promise.reject(customError)

      const result = getSuccessPromise(promise)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toEqual([false, undefined])
    })
  })
})
