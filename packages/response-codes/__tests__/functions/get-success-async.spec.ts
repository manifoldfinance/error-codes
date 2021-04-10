import { getSuccessAsync } from '@functions/get-success-async'
import ' /jest-matchers'

describe('getSuccessAsync<T>(fn: () => PromiseLike<T>): Promise<[true, T] | [false, undefined]>', () => {
  describe('fn returned', () => {
    it('return Promise<[true, T]>', async () => {
      const value = 'value'
      const fn = () => Promise.resolve(value)

      const result = getSuccessAsync(fn)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toEqual([true, value])
    })
  })

  describe('fn throwed', () => {
    describe('sync', () => {
      it('return Promise<[false, undefined]>', async () => {
        const customError = new Error('CustomError')
        const fn = () => {
          throw customError
          return Promise.reject()
        }

        const result = getSuccessAsync(fn)
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toEqual([false, undefined])
      })
    })

    describe('async', () => {
      it('return Promise<[false, undefined]>', async () => {
        const customError = new Error('CustomError')
        const fn = () => Promise.reject(customError)

        const result = getSuccessAsync(fn)
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toEqual([false, undefined])
      })
    })
  })
})
