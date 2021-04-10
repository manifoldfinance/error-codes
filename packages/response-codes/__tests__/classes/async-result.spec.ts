import { AsyncResult } from '@classes/async-result'
import 'jest-extended'

describe('AsyncResult<T, X>', () => {
  describe('Ok<T>(value: T): IAsyncResult<T, never>', () => {
    it('return Ok', async () => {
      const value = 'value'

      const result = AsyncResult.Ok(value)
      const isOk = await result.isOk()

      expect(result).toBeInstanceOf(AsyncResult)
      expect(isOk).toBeTrue()
    })
  })

  describe('Err<X>(error: X): IAsyncResult<never, X>', () => {
    it('return Err', async () => {
      const error = 'error'

      const result = AsyncResult.Err(error)
      const isErr = await result.isErr()

      expect(result).toBeInstanceOf(AsyncResult)
      expect(isErr).toBeTrue()
    })
  })
})
