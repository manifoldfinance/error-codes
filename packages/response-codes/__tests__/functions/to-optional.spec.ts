import { Optional } from '@classes/optional'
import { toOptional, toOptionalPartial } from '@functions/to-optional'
import 'jest-extended'

describe('toOptional<T>(fn: () => T | U, isNone: (val: T) => boolean): IOptional<T>', () => {
  describe('isNone returned true', () => {
    it('return None', () => {
      const fn = () => null
      const allIsNone = () => true

      const result = toOptional(fn, allIsNone)
      const isNone = result.isNone()

      expect(result).toBeInstanceOf(Optional)
      expect(isNone).toBeTrue()
    })
  })

  describe('isNone returned false', () => {
    it('return Some', () => {
      const fn = () => null
      const allIsSome = () => false

      const result = toOptional(fn, allIsSome)
      const isSome = result.isSome()

      expect(result).toBeInstanceOf(Optional)
      expect(isSome).toBeTrue()
    })
  })
})

describe('toOptionalPartial<T>(isNone: (val: T) => boolean): (fn: () => T | U) => IOptional<T>', () => {
  describe('isNone returned true', () => {
    it('return None', () => {
      const fn = () => null
      const allIsNone = () => true

      const result = toOptionalPartial(allIsNone)(fn)
      const isNone = result.isNone()

      expect(result).toBeInstanceOf(Optional)
      expect(isNone).toBeTrue()
    })
  })

  describe('isNone returned false', () => {
    it('return Some', () => {
      const fn = () => null
      const allIsSome = () => false

      const result = toOptionalPartial(allIsSome)(fn)
      const isSome = result.isSome()

      expect(result).toBeInstanceOf(Optional)
      expect(isSome).toBeTrue()
    })
  })
})
