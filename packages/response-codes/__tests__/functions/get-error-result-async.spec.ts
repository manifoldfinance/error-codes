import { getErrorResultAsync } from '@functions/get-error-result-async'
import ' /jest-matchers'

describe('getErrorResultAsync<X = Error, T = unknown>(fn: () => PromiseLike<T>): Promise<[undefined, T] | [X, undefined]>', () => {
  describe('fn returned', () => {
    it('return Promise<[undefined, T]>', async () => {
      const value = 'value'
      const fn = () => Promise.resolve(value)

      const result = getErrorResultAsync<string>(fn)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toEqual([undefined, value])
    })
  })

  describe('fn throwed', () => {
    describe('sync', () => {
      it('return Promise<[X, undefined]>', async () => {
        const customError = new Error('CustomError')
        const fn = () => {
          throw customError
          return Promise.reject(customError)
        }

        const result = getErrorResultAsync<string>(fn)
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toEqual([customError, undefined])
      })
    })

    describe('async', () => {
      it('return Promise<[X, undefined]>', async () => {
        const customError = new Error('CustomError')
        const fn = () => Promise.reject(customError)

        const result = getErrorResultAsync<string>(fn)
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toEqual([customError, undefined])
      })
    })
  })
})
