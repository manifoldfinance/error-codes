import { getError } from '@functions/get-error'
import { Result } from '@classes/result'
import 'jest-extended'
import ' /jest-matchers'

describe('Err<X>', () => {
  describe('static of<T>(error: T): IResult<never, T>', () => {
    it('return Err<T>', () => {
      const error = 'err'

      const result = Result.Err(error)

      expect(result).toBeInstanceOf(Result)
    })
  })

  describe('isOk(): boolean', () => {
    it('return false', () => {
      const error = new Error('error')
      const res = Result.Err(error)

      const result = res.isOk()

      expect(result).toBeFalse()
    })
  })

  describe('isErr(): boolean', () => {
    it('return true', () => {
      const error = new Error('error')
      const res = Result.Err(error)

      const result = res.isErr()

      expect(result).toBeTrue()
    })
  })

  describe('onOk(callback: (value: never) => void): IResult<never, T>', () => {
    it('not invoke callback', () => {
      const error = new Error('error')
      const res = Result.Err(error)
      const cb = jest.fn()

      const result = res.onOk(cb)

      expect(result).toBeInstanceOf(Result)
      expect(result).not.toBe(res)
      expect(cb).not.toBeCalled()
    })
  })

  describe('onErr(callback: (err: T) => void): IResult<never, T>', () => {
    it('invoke callback', () => {
      const error = new Error('error')
      const res = Result.Err(error)
      const cb = jest.fn()

      const result = res.onErr(cb)

      expect(result).toBeInstanceOf(Result)
      expect(result).not.toBe(res)
      expect(cb).toBeCalledWith(error)
    })
  })

  describe('orElse<U>(defaultValue: U): IResult<T, never>', () => {
    it('return Ok', () => {
      const error = new Error('error')
      const defaultValue = 0
      const res = Result.Err(error)

      const result = res.orElse(defaultValue)
      const isOk = result.isOk()
      const internalValue = result.get()

      expect(result).toBeInstanceOf(Result)
      expect(isOk).toBeTrue()
      expect(internalValue).toBe(defaultValue)
    })
  })

  describe('map<U>(fn: (val: never) => U): IResult<never, T>', () => {
    it('return a copy', () => {
      const error = new Error('error')
      const res = Result.Err(error)
      const newValue = 0
      const fn = jest.fn().mockReturnValue(newValue)

      const result = res.map(fn)
      const isErr = result.isErr()

      expect(result).toBeInstanceOf(Result)
      expect(result).not.toBe(res)
      expect(isErr).toBeTrue()
    })
  })

  describe('get(): never', () => {
    it('throw T', () => {
      const error = new Error('error')
      const res = Result.Err(error)

      const result = getError(() => res.get())

      expect(result).toBe(error)
    })
  })
})
