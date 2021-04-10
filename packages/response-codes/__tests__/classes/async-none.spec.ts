import { Optional } from '@classes/optional'
import { getErrorPromise } from '@functions/get-error-promise'
import { AsyncOptional } from '@classes/async-optional'
import 'jest-extended'
import ' /jest-matchers'

describe('AsyncNone', () => {
  it('is PromiseLike<None>', async () => {
    const opt = AsyncOptional.None()

    const result = await opt

    expect(opt).toBePromiseLike()
    expect(result).toBeInstanceOf(Optional)
    expect(result.isNone()).toBeTrue()
  })

  describe('isSome(): Promise<boolean>', () => {
    it('return Promise<false>', async () => {
      const opt = AsyncOptional.None()

      const result = opt.isSome()
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBeFalse()
    })
  })

  describe('isNone(): Promise<boolean>', () => {
    it('return Promise<true>', async () => {
      const opt = AsyncOptional.None()

      const result = opt.isNone()
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBeTrue()
    })
  })

  describe('onSome(callback: (val: T) => void): IAsyncOptional<T>', () => {
    it('not invoke callback', async () => {
      const opt = AsyncOptional.None()
      const cb = jest.fn()

      const result = opt.onSome(cb)
      await runAllMicrotasks()

      expect(result).toBeInstanceOf(AsyncOptional)
      expect(result).not.toBe(opt)
      expect(cb).not.toBeCalled()
    })
  })

  describe('onNone(callback: () => void): IAsyncOptional<T>', () => {
    it('invoke callback', async () => {
      const opt = AsyncOptional.None()
      const cb = jest.fn()

      const result = opt.onNone(cb)
      const calledTimesBefore = getCalledTimes(cb)
      await runAllMicrotasks
      const calledTimesAfter = getCalledTimes(cb)

      expect(result).toBeInstanceOf(AsyncOptional)
      expect(result).not.toBe(opt)
      expect(calledTimesBefore).toBe(0)
      expect(calledTimesAfter).toBe(1)
    })
  })

  describe('orElse<U>(defaultValue: U): IAsyncOptional<T | U>', () => {
    it('return a AsyncSome', async () => {
      const opt = AsyncOptional.None()
      const defaultValue = 'defaultValue'

      const result = opt.orElse(defaultValue)
      const internalValue = await result.get()

      expect(result).toBeInstanceOf(AsyncOptional)
      expect(internalValue).toBe(defaultValue)
    })
  })

  describe('map<U>(mapper: (val: T) => U): IAsyncOptional<U>', () => {
    it('return a copy', async () => {
      const opt = AsyncOptional.None()
      const fn = jest.fn()

      const result = opt.map(fn)
      const isNone = await result.isNone()

      expect(fn).not.toBeCalled()
      expect(result).toBeInstanceOf(AsyncOptional)
      expect(isNone).toBeTrue()
      expect(result).not.toBe(opt)
    })
  })

  describe('filter<U extends T = T>(predicate: (val: T) => boolean): IAsyncOptional<U>', () => {
    it('return a copy', async () => {
      const opt = AsyncOptional.None()
      const fn = jest.fn()

      const result = opt.filter(fn)
      const isNone = await result.isNone()

      expect(fn).not.toBeCalled()
      expect(result).toBeInstanceOf(AsyncOptional)
      expect(isNone).toBeTrue()
      expect(result).not.toBe(opt)
    })
  })

  describe('get(): Promise<T>', () => {
    it('throw error', async () => {
      const opt = AsyncOptional.None()

      const result = opt.get()
      const err = await getErrorPromise(result)

      expect(result).toBePromise()
      expect(err).toBeInstanceOf(Error)
    })
  })
})

function runAllMicrotasks(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 0))
}

function getCalledTimes(fn: jest.Mock) {
  return fn.mock.calls.length
}
