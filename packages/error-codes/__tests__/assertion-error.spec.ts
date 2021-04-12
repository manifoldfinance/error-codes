import { CustomError } from '@src/custom-error'
import { AssertionError } from '@src/assertion-error'

describe('AssertionError', () => {
  it('instanceof CustomError', () => {
    const err = new AssertionError()

    expect(err).toBeInstanceOf(CustomError)
  })

  it('prop name return the name of constructor', () => {
    const message = 'message'
    class UserError extends AssertionError {}

    const err = new UserError(message)

    expect(err.name).toBe('UserError')
    expect(err.message).toBe(message)
  })
})
