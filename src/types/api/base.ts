export type BaseResponse<T> = {
  error: boolean
  message: string
  errorCode?: number
  data: T | null
}

export type ErrorResponse = {
  error: boolean
  message: string
}

export function isBaseResponse<T>(obj: unknown): obj is BaseResponse<T> {
  return (
    obj !== null && typeof obj === 'object' && 'data' in obj && 'message' in obj
  )
}

export type IReqHeaders = {
  "Signature": string,
  "Signature-Algorithm": any
}