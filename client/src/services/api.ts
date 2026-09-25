const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

type RequestOptions = RequestInit & {
  token?: string
}

export const api = async <T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> => {
  const {
    token,
    headers,
    ...requestOptions
  } = options

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...requestOptions,
      headers: {
        'Content-Type': 'application/json',
        ...(token
          ? {
              Authorization: `Bearer ${token}`
            }
          : {}),
        ...headers
      }
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message || 'Something went wrong'
    )
  }

  return data as T
}