export function getError<X = Error>(fn: () => unknown): X | undefined {
  try {
    fn()
  } catch (syncError) {
    return syncError
  }
  return
}
