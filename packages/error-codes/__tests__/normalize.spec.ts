import { normalize } from '@src/normalize'

describe('normalize(err: Error): SerializableError', () => {
  it('return SerializableError', () => {
    const err = new Error('test')

    const result = normalize(err)

    expect(result).toEqual({
      name: 'Error'
    , message: 'test'
    , stack: expect.stringContaining('\n')
    })
  })
})
