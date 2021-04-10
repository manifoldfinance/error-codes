import { AsyncOptional } from '@classes/async-optional'
import { toOptionalPromise, toOptionalPromisePartial } from '@functions/to-optional-promise'
import 'jest-extended'

describe('toOptionalPromise<T>(promise: PromiseLike<T>, isNone: (val: T) => boolean): Promise<IOptional<T>>', () => {
  describe('isNone returned true', () => {
    it('return IAsyncOptional<never>', async () => {
      const promise = Promise.resolve()
      const allIsNone = () => true

      const result = toOptionalPromise(promise, allIsNone)
      const isNone = await result.isNone()

      expect(result).toBeInstanceOf(AsyncOptional)
      expect(isNone).toBeTrue()
    })
  })

  describe('isNone returned false', () => {
    it('return IAsyncOptional<T>', async () => {
      const promise = Promise.resolve()
      const allIsSome = () => false

      const result = toOptionalPromise(promise, allIsSome)
      const isSome = await result.isSome()

      expect(result).toBeInstanceOf(AsyncOptional)
      expect(isSome).toBeTrue()
    })
  })
})

describe('toOptionalPromisePartial<T>(isNone: (val: T) => boolean): (promise: PromiseLike<T>) => Promise<IOptional<T>>', () => {
  describe('isNone returned true', () => {
    it('return Promise<None>', async () => {
      const promise = Promise.resolve()
      const allIsNone = () => true

      const result = toOptionalPromisePartial(allIsNone)(promise)
      const isNone = await result.isNone()

      expect(result).toBeInstanceOf(AsyncOptional)
      expect(isNone).toBeTrue()
    })
  })

  describe('isNone returned false', () => {
    it('return Promise<Some>', async () => {
      const promise = Promise.resolve()
      const allIsSome = () => false

      const result = toOptionalPromisePartial(allIsSome)(promise)
      const isSome = await result.isSome()

      expect(result).toBeInstanceOf(AsyncOptional)
      expect(isSome).toBeTrue()
    })
  })
})
