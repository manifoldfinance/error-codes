import { ExpectedError } from './expected-error'

/**
 * @throws {ExpectedError}
 */
export function refute(condition: unknown, message?: string): void {
  if (condition) throw new ExpectedError(message)
}
