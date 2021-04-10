import { go } from ' /go'
import { getErrorAsyncIterable } from '@functions/get-error-async-iterable'
import ' /jest-matchers'

describe('getErrorAsyncIterable<T>(iterable: AsyncIterable<unknown>): Promise<T | undefined>', () => {
  describe('promise resolved', () => {
    it('return Promise<undefined>', async () => {
      const iter = go(async function* () {})

      const result = getErrorAsyncIterable(iter)
      const err = await result

      expect(result).toBePromise()
      expect(err).toBeUndefined()
    })
  })

  describe('promise rejected', () => {
    it('return Promise<T>', async () => {
      const customError = new Error('CustomError')
      const iter = go(async function* () { throw customError })

      const result = getErrorAsyncIterable(iter)
      const err = await result

      expect(result).toBePromise()
      expect(err).toBe(customError)
    })
  })
})
