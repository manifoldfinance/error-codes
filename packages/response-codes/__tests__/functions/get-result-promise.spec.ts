import { getResultPromise } from '@functions/get-result-promise'
import ' /jest-matchers'

describe('getResultPromise<T>(promise: PromiseLike<T>): Promise<T | undefined>', () => {
  describe('fn returned', () => {
    it('return Promise<T>', async () => {
      const value = 'value'
      const promise = Promise.resolve(value)

      const result = getResultPromise(promise)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(value)
    })
  })

  describe('fn throwed', () => {
    it('return Promise<undefined>', async () => {
      const promise = Promise.reject()

      const result = getResultPromise(promise)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBeUndefined()
    })
  })
})
