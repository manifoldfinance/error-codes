import { getErrorPromise } from '@functions/get-error-promise'
import { Result } from '@classes/result'
import { AsyncResult } from '@classes/async-result'
import 'jest-extended'
import ' /jest-matchers'

describe('AsyncErr<X>', () => {
  it('is PromiseLike<Err<X>>', async () => {
    const error = new Error('error')
    const res = AsyncResult.Err(error)

    const result = await res

    expect(res).toBePromiseLike()
    expect(result).toBeInstanceOf(Result)
    expect(result.isErr()).toBeTrue()
  })

  describe('isOk(): Promise<boolean>', () => {
    it('return false', async () => {
      const error = new Error('error')
      const res = AsyncResult.Err(error)

      const result = res.isOk()
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBeFalse()
    })
  })

  describe('isErr(): Promise<boolean>', () => {
    it('return true', async () => {
      const error = new Error('error')
      const res = AsyncResult.Err(error)

      const result = res.isErr()
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBeTrue()
    })
  })

  describe('onOk(callback: (val: T) => void): IAsyncResult<T, X>', () => {
    it('not invoke callback', async () => {
      const error = new Error('error')
      const res = AsyncResult.Err(error)
      const cb = jest.fn()

      const result = res.onOk(cb)
      await runAllMicrotasks()

      expect(result).toBeInstanceOf(AsyncResult)
      expect(result).not.toBe(res)
      expect(cb).not.toBeCalled()
    })
  })

  describe('onErr(callback: (err: X) => void): IAsyncResult<T, X>', () => {
    it('invoke callback', async () => {
      const error = new Error('error')
      const res = AsyncResult.Err(error)
      const cb = jest.fn()

      const result = res.onErr(cb)
      const calledTimesBefore = getCalledTimes(cb)
      await runAllMicrotasks()
      const calledTimesAfter = getCalledTimes(cb)

      expect(result).toBeInstanceOf(AsyncResult)
      expect(result).not.toBe(res)
      expect(calledTimesBefore).toBe(0)
      expect(calledTimesAfter).toBe(1)
      expect(cb).toBeCalledWith(error)
    })
  })

  describe('orElse<U>(defaultVAlue: U): IAsyncResult<T | U, X>', () => {
    it('return Ok', async () => {
      const error = new Error('error')
      const defaultValue = 0
      const res = AsyncResult.Err(error)

      const result = res.orElse(defaultValue)
      const isOk = await result.isOk()
      const internalValue = await result.get()

      expect(result).toBeInstanceOf(AsyncResult)
      expect(result).not.toBe(res)
      expect(isOk).toBeTrue()
      expect(internalValue).toBe(defaultValue)
    })
  })

  describe('map<U>(mapper: (val: T) => U): IAsyncResult<U, X>', () => {
    it('return a copy', async () => {
      const error = new Error('error')
      const res = AsyncResult.Err(error)
      const newValue = 0
      const fn = jest.fn().mockReturnValue(newValue)

      const result = res.map(fn)
      const isErr = await result.isErr()

      expect(result).toBeInstanceOf(AsyncResult)
      expect(result).not.toBe(res)
      expect(isErr).toBeTrue()
    })
  })

  describe('get(): T', () => {
    it('throw X', async () => {
      const error = new Error('error')
      const res = AsyncResult.Err(error)

      const result = await getErrorPromise(res.get())

      expect(result).toBe(error)
    })
  })
})

function runAllMicrotasks(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 0))
}

function getCalledTimes(fn: jest.Mock) {
  return fn.mock.calls.length
}
