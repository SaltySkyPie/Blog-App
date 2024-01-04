
export interface TokenInfo {
    id: string
    username: string
    firstName: string
    lastName: string
    middleName?: string
    iat: number
    exp: number
}

export function parseToken(jwt: string): TokenInfo {
  const base64Url = jwt.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const decodedPayload = decodeBase64WithDiacritics(base64)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return JSON.parse(decodedPayload)
}

function decodeBase64WithDiacritics(base64: string): string {
  const replacedBase64 = base64.replace(/-/g, '+').replace(/_/g, '/')
  const paddedBase64 = replacedBase64 + '=='.substring(0, (4 - (replacedBase64.length % 4)) % 4)
  const decodedPayload = atob(paddedBase64)

  try {
    return decodeURIComponent(escape(decodedPayload))
  } catch (error) {
    console.error('Error decoding base64 with diacritics:', error)
    return decodedPayload
  }
}
