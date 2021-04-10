import { Optional } from '@classes/optional'
import 'jest-extended'
import ' /jest-matchers'

describe('Some<T>', () => {
  describe('isSome(): boolean', () => {
    it('return true', () => {
      const value = 'value'
      const opt = Optional.Some(value)

      const isSome = opt.isSome()

      expect(isSome).toBeTrue()
    })
  })

  describe('isNone(): boolean', () => {
    it('return false', () => {
      const value = 'value'
      const opt = Optional.Some(value)

      const isNone = opt.isNone()

      expect(isNone).toBeFalse()
    })
  })

  describe('onSome(callback: (val: T) => void): IOptional<T>', () => {
    it('invoke callback', () => {
      const value = 'value'
      const opt = Optional.Some(value)
      const cb = jest.fn()

      const result = opt.onSome(cb)

      expect(result).toBeInstanceOf(Optional)
      expect(result).not.toBe(opt)
      expect(cb).toBeCalledWith(value)
    })
  })

  describe('onNone(callback: () => void): IOptional<T>', () => {
    it('not invoke callback', () => {
      const value = 'value'
      const opt = Optional.Some(value)
      const cb = jest.fn()

      const result = opt.onNone(cb)

      expect(result).toBeInstanceOf(Optional)
      expect(result).not.toBe(opt)
      expect(cb).not.toBeCalled()
    })
  })

  describe('orElse<U>(defaultValue: U): IOptional<T | U>', () => {
    it('return a copy', () => {
      const value = 'value'
      const defaultValue = 0
      const opt = Optional.Some(value)

      const result = opt.orElse(defaultValue)
      const isSome = result.isSome()
      const internalValue = result.get()

      expect(result).toBeInstanceOf(Optional)
      expect(result).not.toBe(opt)
      expect(isSome).toBeTrue()
      expect(internalValue).toBe(value)
    })
  })

  describe('map<U>(mapper: (val: T) => U): IOptional<U>', () => {
    it('return a Some', () => {
      const value = 'value'
      const opt = Optional.Some(value)
      const newValue = 0
      const fn = jest.fn().mockReturnValue(newValue)

      const result = opt.map(fn)
      const isSome = result.isSome()
      const internalValue = result.get()

      expect(result).toBeInstanceOf(Optional)
      expect(result).not.toBe(opt)
      expect(isSome).toBeTrue()
      expect(internalValue).toBe(newValue)
    })
  })

  describe('filter<U extends T = T>(predicate: (val: T) => boolean): IOptional<U>', () => {
    describe('predicate return false', () => {
      it('return None', () => {
        const value = 'value'
        const opt = Optional.Some(value)
        const fn = jest.fn().mockReturnValue(false)

        const result = opt.filter(fn)
        const isNone = result.isNone()

        expect(result).toBeInstanceOf(Optional)
        expect(isNone).toBeTrue()
      })
    })

    describe('predicate return true', () => {
      it('return a copy', () => {
        const value = 'value'
        const opt = Optional.Some(value)
        const fn = jest.fn().mockReturnValue(true)

        const result = opt.filter(fn)
        const isSome = result.isSome()
        const internalValue = result.get()

        expect(result).toBeInstanceOf(Optional)
        expect(result).not.toBe(opt)
        expect(isSome).toBeTrue()
        expect(internalValue).toBe(value)
      })
    })
  })

  describe('get(): T', () => {
    it('return T', () => {
      const value = 'value'
      const opt = Optional.Some(value)

      const result = opt.get()

      expect(result).toBe(value)
    })
  })
})
