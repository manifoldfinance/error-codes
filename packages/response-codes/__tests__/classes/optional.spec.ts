import { Optional } from '@classes/optional'
import 'jest-extended'

describe('Optional<T>', () => {
  describe('Some<T>(value: T): IOptional<T>', () => {
    it('return Some', () => {
      const value = 'value'

      const result = Optional.Some(value)
      const isSome = result.isSome()

      expect(result).toBeInstanceOf(Optional)
      expect(isSome).toBeTrue()
    })
  })

  describe('None(): IOptional<never>', () => {
    it('return None', () => {
      const result = Optional.None()
      const isNone = result.isNone()

      expect(result).toBeInstanceOf(Optional)
      expect(isNone).toBeTrue()
    })
  })
})
