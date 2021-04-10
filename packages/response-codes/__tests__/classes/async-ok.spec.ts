import { Result } from '@classes/result'
import { AsyncResult } from '@classes/async-result'
import 'jest-extended'
import ' /jest-matchers'

describe('AsyncOk<T>', () => {
  it('is PromiseLike<Ok<T>>', async () => {
    const value = 'value'
    const res = AsyncResult.Ok(value)

    const result = await res

    expect(res).toBePromiseLike()
    expect(result).toBeInstanceOf(Result)
    expect(result.isOk()).toBeTrue()
  })

  describe('isOk(): Promise<boolean>', () => {
    it('return true', async () => {
      const value = 'value'
      const res = AsyncResult.Ok(value)

      const result = res.isOk()
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBeTrue()
    })
  })

  describe('isErr(): Promise<boolean>', () => {
    it('return false', async () => {
      const value = 'value'
      const res = AsyncResult.Ok(value)

      const result = res.isErr()
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBeFalse()
    })
  })

  describe('onOk(callback: (val: T) => void): IAsyncResult<T, X>', () => {
    it('invoke callback', async () => {
      const value = 'value'
      const res = AsyncResult.Ok(value)
      const cb = jest.fn()

      const result = res.onOk(cb)
      const calledTimesBefore = getCalledTimes(cb)
      await runAllMicrotasks()
      const calledTimesAfter = getCalledTimes(cb)

      expect(result).toBeInstanceOf(AsyncResult)
      expect(result).not.toBe(res)
      expect(calledTimesBefore).toBe(0)
      expect(calledTimesAfter).toBe(1)
      expect(cb).toBeCalledWith(value)
    })
  })

  describe('onErr(callback: (err: X) => void): IAsyncResult<T, X>', () => {
    it('not invoke callback', async () => {
      const value = 'value'
      const res = AsyncResult.Ok(value)
      const cb = jest.fn()

      const result = res.onErr(cb)
      await runAllMicrotasks()

      expect(result).toBeInstanceOf(AsyncResult)
      expect(result).not.toBe(res)
      expect(cb).not.toBeCalled()
    })
  })

  describe('orElse<U>(defaultValue: U): IAsyncResult<T | U, X>', () => {
    it('return a copy', async () => {
      const value = 'value'
      const defaultValue = 0
      const res = AsyncResult.Ok(value)

      const result = res.orElse(defaultValue)
      const isOk = await result.isOk()
      const internalValue = await result.get()

      expect(result).toBeInstanceOf(AsyncResult)
      expect(result).not.toBe(res)
      expect(isOk).toBeTrue()
      expect(internalValue).toBe(value)
    })
  })

  describe('map<U>(mapper: (val: T) => U): IAsyncResult<U, X>', () => {
    it('return Ok', async () => {
      const value = 'value'
      const res = AsyncResult.Ok(value)
      const newValue = 0
      const fn = jest.fn().mockReturnValue(newValue)

      const result = res.map(fn)
      const isOk = await result.isOk()
      const internalValue = await result.get()

      expect(result).toBeInstanceOf(AsyncResult)
      expect(result).not.toBe(res)
      expect(isOk).toBeTrue()
      expect(internalValue).toBe(newValue)
    })
  })

  describe('get(): Promise<T>', () => {
    it('return T', async () => {
      const value = 'value'
      const res = AsyncResult.Ok(value)

      const result = res.get()
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(value)
    })
  })
})

function runAllMicrotasks(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 0))
}

function getCalledTimes(fn: jest.Mock) {
  return fn.mock.calls.length
}
