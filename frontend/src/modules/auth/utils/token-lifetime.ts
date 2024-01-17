import { TokenInfo } from './token-parser'

const calculateTokenLifetime = (token: TokenInfo): number => {
  const exp = (token.exp - token.iat) / 60
  return exp
}

export default calculateTokenLifetime
