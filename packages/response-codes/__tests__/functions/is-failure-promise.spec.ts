import { isFailurePromise } from '@functions/is-failure-promise'
import 'jest-extended'
import ' /jest-matchers'

describe('isFailurePromise(promise: PromiseLike<unknown>): Promise<boolean>', () => {
  describe('promise resolved', () => {
    it('return Promise<false>', async () => {
      const promise = Promise.resolve()

      const result = isFailurePromise(promise)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBeFalse()
    })
  })

  describe('promise rejected', () => {
    it('return Promise<true>', async () => {
      const promise = Promise.reject()

      const result = isFailurePromise(promise)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBeTrue()
    })
  })
})
