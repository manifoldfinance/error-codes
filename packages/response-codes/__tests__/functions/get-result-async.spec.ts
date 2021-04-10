import { getResultAsync } from '@functions/get-result-async'
import ' /jest-matchers'

describe('getResultAsync<T>(fn: () => PromiseLike<T>): Promise<T | undefined>', () => {
  describe('fn returned', () => {
    it('return Promise<undefined>', async () => {
      const value = 'value'
      const fn = () => Promise.resolve(value)

      const result = getResultAsync(fn)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(value)
    })
  })

  describe('fn throwed', () => {
    describe('sync', () => {
      it('return Promise<undefined>', async () => {
        const customError = new Error('CusomtError')
        const fn = () => {
          throw customError
          return Promise.resolve('value')
        }

        const result = getResultAsync(fn)
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toBeUndefined()
      })
    })

    describe('async', () => {
      it('return Promise<undefined>', async () => {
        const customError = new Error('CustomError')
        const fn = () => Promise.reject(customError)

        const result = getResultAsync(fn)
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toBeUndefined()
      })
    })
  })
})
