import { AsyncOptional } from '@classes/async-optional'
import { toOptionalAsync, toOptionalAsyncPartial } from '@functions/to-optional-async'
import 'jest-extended'

describe('toOptionalAsync<T>(fn: () => Promise<T> | T , isNone: (val: T) => boolean): AsyncOptional<T>', () => {
  describe('isNone returned true', () => {
    it('return None', async () => {
      const fn = async () => null
      const allIsNone = () => true

      const result = toOptionalAsync(fn, allIsNone)
      const isNone = await result.isNone()

      expect(result).toBeInstanceOf(AsyncOptional)
      expect(isNone).toBeTrue()
    })
  })

  describe('isNone returned false', () => {
    it('return Some', async () => {
      const fn = async () => null
      const allIsSome = () => false

      const result = toOptionalAsync(fn, allIsSome)
      const isSome = await result.isSome()

      expect(result).toBeInstanceOf(AsyncOptional)
      expect(isSome).toBeTrue()
    })
  })
})

describe('toOptionalAsyncPartial<T>(isNone: (val: T) => boolean): (fn: () => PromiseLike<T> | T) => AsyncOptional<T>', () => {
  describe('isNone returned true', () => {
    it('return None', async () => {
      const fn = async () => null
      const allIsNone = () => true

      const result = toOptionalAsyncPartial(allIsNone)(fn)
      const isNone = await result.isNone()

      expect(result).toBeInstanceOf(AsyncOptional)
      expect(isNone).toBeTrue()
    })
  })

  describe('isNone returned false', () => {
    it('return Some', async () => {
      const fn = async () => null
      const allIsSome = () => false

      const result = toOptionalAsyncPartial(allIsSome)(fn)
      const isSome = await result.isSome()

      expect(result).toBeInstanceOf(AsyncOptional)
      expect(isSome).toBeTrue()
    })
  })
})
