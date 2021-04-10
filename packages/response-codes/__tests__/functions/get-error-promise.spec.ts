import { getErrorPromise } from '@functions/get-error-promise'
import ' /jest-matchers'

describe('getErrorPromise<T>(promise: PromiseLike<unknown>): Promise<T | undefined>', () => {
  describe('promise resolved', () => {
    it('return Promise<undefined>', async () => {
      const promise = Promise.resolve('value')

      const result = getErrorPromise(promise)
      const err = await result

      expect(result).toBePromise()
      expect(err).toBeUndefined()
    })
  })

  describe('promise rejected', () => {
    it('return Promise<T>', async () => {
      const customError = new Error('CustomError')
      const promise = Promise.reject(customError)

      const result = getErrorPromise(promise)
      const err = await result

      expect(result).toBePromise()
      expect(err).toBe(customError)
    })
  })
})
