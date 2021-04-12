import { CustomError } from '@src/custom-error'
import { ExpectedError } from '@src/expected-error'

describe('ExpectedError', () => {
  it('instanceof CustomError', () => {
    const err = new ExpectedError()

    expect(err).toBeInstanceOf(CustomError)
  })

  it('prop name return the name of constructor', () => {
    const message = 'message'
    class UserError extends ExpectedError {}

    const err = new UserError('message')

    expect(err.name).toBe('UserError')
    expect(err.message).toBe(message)
  })
})
