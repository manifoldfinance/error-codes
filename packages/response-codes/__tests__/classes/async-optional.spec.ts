import { AsyncOptional } from '@classes/async-optional'
import 'jest-extended'

describe('AsyncOptional<T>', () => {
  describe('Some<T>(value: T): IAsyncOptional<T>', () => {
    it('return Some', async () => {
      const value = 'value'

      const result = AsyncOptional.Some(value)
      const isSome = await result.isSome()

      expect(result).toBeInstanceOf(AsyncOptional)
      expect(isSome).toBeTrue()
    })
  })

  describe('None(): IAsyncOptional<never>', () => {
    it('return AsyncNone', async () => {
      const result = AsyncOptional.None()
      const isNone = await result.isNone()

      expect(result).toBeInstanceOf(AsyncOptional)
      expect(isNone).toBeTrue()
    })
  })
})
