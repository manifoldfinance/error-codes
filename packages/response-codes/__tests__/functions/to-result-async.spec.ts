import { AsyncResult } from '@classes/async-result'
import { toResultAsync } from '@functions/to-result-async'
import 'jest-extended'
import ' /jest-matchers'

describe('toResultAsync<X = Error, T = unknown>(fn: () => PromiseLike<T>): IAsyncResult<T, X>', () => {
  describe('fn returned', () => {
    it('return Ok', async () => {
      const fn = jest.fn().mockResolvedValue(true)

      const result = toResultAsync<boolean>(fn)
      const isOk = await result.isOk()

      expect(result).toBeInstanceOf(AsyncResult)
      expect(isOk).toBeTrue()
    })
  })

  describe('fn throwed', () => {
    describe('sync', () => {
      it('return Err', async () => {
        const fn = () => {
          throw new Error()
          return Promise.resolve(true)
        }

        const result = toResultAsync<boolean>(fn)
        const isErr = await result.isErr()

        expect(result).toBeInstanceOf(AsyncResult)
        expect(isErr).toBeTrue()
      })
    })

    describe('async', () => {
      it('return Err', async () => {
        const fn = jest.fn().mockRejectedValue(new Error())

        const result = toResultAsync<boolean>(fn)
        const isErr = await result.isErr()

        expect(result).toBeInstanceOf(AsyncResult)
        expect(isErr).toBeTrue()
      })
    })
  })
})
