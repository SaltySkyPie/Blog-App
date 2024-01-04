import { TokenInfo } from './token-parser'

const calculateTokenLifetime = (token: TokenInfo): number => {
  return token.exp - token.iat / 60
}

export default calculateTokenLifetime
