import { CustomError } from '@src/custom-error'

describe('CustomError', () => {
  it('instanceof Error', () => {
    const err = new CustomError()

    expect(err).toBeInstanceOf(Error)
  })

  it('prop name return the name of constructor', () => {
    class UserError extends CustomError {}

    const err = new UserError()

    expect(err.name).toBe('UserError')
  })
})
