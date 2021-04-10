import { getError } from '@functions/get-error'
import { Optional } from '@classes/optional'
import 'jest-extended'
import ' /jest-matchers'

describe('None', () => {
  describe('isSome(): boolean', () => {
    it('return false', () => {
      const opt = Optional.None()

      const result = opt.isSome()

      expect(result).toBeFalse()
    })
  })

  describe('isNone(): boolean', () => {
    it('return true', () => {
      const opt = Optional.None()

      const result = opt.isNone()

      expect(result).toBeTrue()
    })
  })

  describe('onSome(callback: (val: T) => void): IOptional<T>', () => {
    it('not invoke callback', () => {
      const opt = Optional.None()
      const cb = jest.fn()

      const result = opt.onSome(cb)

      expect(result).toBeInstanceOf(Optional)
      expect(result).not.toBe(opt)
      expect(cb).not.toBeCalled()
    })
  })

  describe('onNone(callback: () => void): IOptional<T>', () => {
    it('invoke callback', () => {
      const opt = Optional.None()
      const cb = jest.fn()

      const result = opt.onNone(cb)

      expect(result).toBeInstanceOf(Optional)
      expect(result).not.toBe(opt)
      expect(cb).toBeCalled()
    })
  })

  describe('orElse<U>(defaultValue: U): IOptional<T | U>', () => {
    it('return a Some', () => {
      const opt = Optional.None()
      const defaultValue = 'defaultValue'

      const result = opt.orElse(defaultValue)
      const isSome = result.isSome()
      const internalValue = result.get()

      expect(result).toBeInstanceOf(Optional)
      expect(isSome).toBeTrue()
      expect(internalValue).toBe(defaultValue)
    })
  })

  describe('map<U>(mapper: (val: T) => U): IOptional<U>', () => {
    it('return a copy', () => {
      const opt = Optional.None()
      const fn = jest.fn()

      const result = opt.map(fn)
      const isNone = result.isNone()

      expect(fn).not.toBeCalled()
      expect(result).toBeInstanceOf(Optional)
      expect(result).not.toBe(opt)
      expect(isNone).toBeTrue()
    })
  })

  describe('filter<U extends T = T>(predicate: (val: T) => boolean): IOptional<U>', () => {
    it('return a copy', () => {
      const opt = Optional.None()
      const fn = jest.fn()

      const result = opt.filter(fn)
      const isNone = result.isNone()

      expect(fn).not.toBeCalled()
      expect(result).toBeInstanceOf(Optional)
      expect(result).not.toBe(opt)
      expect(isNone).toBeTrue()
    })
  })

  describe('get(): T', () => {
    it('throw error', () => {
      const opt = Optional.None()

      const err = getError(() => opt.get())

      expect(err).toBeInstanceOf(Error)
    })
  })
})
