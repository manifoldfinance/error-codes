import * as target from '@src/index'

test('exports', () => {
  const expectedExports: string[] = [
    'getErrorResult'
  , 'getErrorResultAsync'
  , 'getErrorResultPromise'

  , 'getResultError'
  , 'getResultErrorAsync'
  , 'getResultErrorPromise'

  , 'getSuccess'
  , 'getSuccessAsync'
  , 'getSuccessPromise'

  , 'getFailure'
  , 'getFailureAsync'
  , 'getFailurePromise'

  , 'isSuccess'
  , 'isSuccessAsync'
  , 'isSuccessPromise'

  , 'isFailure'
  , 'isFailureAsync'
  , 'isFailurePromise'

  , 'getResult'
  , 'getResultAsync'
  , 'getResultPromise'

  , 'getError'
  , 'getErrorAsync'
  , 'getErrorPromise'
  , 'getErrorAsyncIterable'

  , 'toResult'
  , 'toResultAsync'
  , 'toResultPromise'

  , 'toOptional'
  , 'toOptionalPartial'
  , 'toOptionalAsync'
  , 'toOptionalAsyncPartial'
  , 'toOptionalPromise'
  , 'toOptionalPromisePartial'
  ].sort()

  const actualExports = Object.keys(target).sort()

  expect(actualExports).toEqual(expectedExports)
})
