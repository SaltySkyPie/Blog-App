import { useAuthUser } from 'react-auth-kit'
import { TokenInfo } from './token-parser'

export type Profile = Omit<TokenInfo, 'iat' | 'exp'>

export function useProfile(): Profile | null {
  const getUser = useAuthUser()
  const user = getUser()

  if (!user) {
    return null
  }

  return {
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    middleName: user.middleName,
  }
}
