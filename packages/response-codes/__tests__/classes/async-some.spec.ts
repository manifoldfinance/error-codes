import { Optional } from '@classes/optional'
import { AsyncOptional } from '@classes/async-optional'
import 'jest-extended'
import ' /jest-matchers'

describe('AsyncSome<T>', () => {
  it('is PromiseLike<Some<T>>', async () => {
    const value = 'value'
    const opt = AsyncOptional.Some(value)

    const result = await opt

    expect(opt).toBePromiseLike()
    expect(result).toBeInstanceOf(Optional)
    expect(result.isSome()).toBeTrue()
  })

  describe('isSome(): boolean', () => {
    it('return true', async () => {
      const value = 'value'
      const opt = AsyncOptional.Some(value)

      const result = opt.isSome()
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBeTrue()
    })
  })

  describe('isNone(): boolean', () => {
    it('return false', async () => {
      const value = 'value'
      const opt = AsyncOptional.Some(value)

      const result = opt.isNone()
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBeFalse()
    })
  })

  describe('onSome(callback: (val: T) => void): IAsyncOptional<T>', () => {
    it('invokde callback', async () => {
      const value = 'value'
      const opt = AsyncOptional.Some(value)
      const cb = jest.fn()

      const result = opt.onSome(cb)
      const calledTimesBefore = getCalledTimes(cb)
      await runAllMicrotasks()
      const calledTimesAfter = getCalledTimes(cb)

      expect(result).toBeInstanceOf(AsyncOptional)
      expect(result).not.toBe(opt)
      expect(calledTimesBefore).toBe(0)
      expect(calledTimesAfter).toBe(1)
      expect(cb).toBeCalledWith(value)
    })
  })

  describe('onNone(callback: () => void): IAsyncOptional<T>', () => {
    it('not invoke callback', async () => {
      const value = 'value'
      const opt = AsyncOptional.Some(value)
      const cb = jest.fn()

      const result = opt.onNone(cb)
      await runAllMicrotasks()

      expect(result).toBeInstanceOf(AsyncOptional)
      expect(result).not.toBe(opt)
      expect(cb).not.toBeCalled()
    })
  })

  describe('orElse<U>(defaultValue: U): IAsyncOptional<T | U>', () => {
    it('return a copy', async () => {
      const value = 'value'
      const defaultValue = 0
      const opt = AsyncOptional.Some(value)

      const result = opt.orElse(defaultValue)
      const isSome = await result.isSome()
      const internalValue = await result.get()

      expect(result).toBeInstanceOf(AsyncOptional)
      expect(result).not.toBe(opt)
      expect(isSome).toBeTrue()
      expect(internalValue).toBe(value)
    })
  })

  describe('map<U>(mapper: (val: T) => U): IAsyncOptional<U>', () => {
    it('return a Some', async () => {
      const value = 'value'
      const opt = AsyncOptional.Some(value)
      const newValue = 0
      const fn = jest.fn().mockReturnValue(newValue)

      const result = opt.map(fn)
      const isSome = await result.isSome()
      const internalValue = await result.get()

      expect(result).toBeInstanceOf(AsyncOptional)
      expect(result).not.toBe(opt)
      expect(isSome).toBeTrue()
      expect(internalValue).toBe(newValue)
    })
  })

  describe('filter<U extends T = T>(predicate: (val: T) => boolean): IAsyncOptional<U>', () => {
    describe('predicate return false', () => {
      it('return None', async () => {
        const value = 'value'
        const opt = AsyncOptional.Some(value)
        const fn = jest.fn().mockReturnValue(false)

        const result = opt.filter(fn)
        const isNone = await result.isNone()

        expect(result).toBeInstanceOf(AsyncOptional)
        expect(isNone).toBeTrue()
      })
    })

    describe('predicate return true', () => {
      it('return a copy', async () => {
        const value = 'value'
        const opt = AsyncOptional.Some(value)
        const fn = jest.fn().mockReturnValue(true)

        const result = opt.filter(fn)
        const isSome = await result.isSome()
        const internalValue = await result.get()

        expect(result).toBeInstanceOf(AsyncOptional)
        expect(result).not.toBe(opt)
        expect(isSome).toBeTrue()
        expect(internalValue).toBe(value)
      })
    })
  })

  describe('get(): Promise<T>', () => {
    it('return Promise<T>', async () => {
      const value = 'value'
      const opt = AsyncOptional.Some(value)

      const result = opt.get()
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
