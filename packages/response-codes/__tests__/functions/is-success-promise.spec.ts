import { isSuccessPromise } from '@functions/is-success-promise'
import 'jest-extended'
import ' /jest-matchers'

describe('isSuccessPromise(promise: PromiseLike<unknown>): Promise<boolean>', () => {
  describe('promise resolved', () => {
    it('return Promise<true>', async () => {
      const promise = Promise.resolve()

      const result = isSuccessPromise(promise)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBeTrue()
    })
  })

  describe('promise rejected', () => {
    it('return Promise<false>', async () => {
      const promise = Promise.reject()

      const result = isSuccessPromise(promise)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBeFalse()
    })
  })
})
