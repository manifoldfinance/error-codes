export interface SerializableError {
  name: string
  message: string
  stack: string | null
}

export function normalize(err: Error): SerializableError {
  return {
    name: err.name
  , message: err.message
  , stack: err.stack ?? null
  }
}
