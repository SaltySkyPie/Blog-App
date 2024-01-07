import { TokenInfo } from './token-parser'

const calculateTokenLifetime = (token: TokenInfo): number => {
  const exp = (token.exp - token.iat) / 60
  //console.log('exp', exp)
  return exp
}

export default calculateTokenLifetime
