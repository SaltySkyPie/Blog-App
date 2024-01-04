import axios, { AxiosRequestConfig } from 'axios'
import { createRefresh } from 'react-auth-kit'
import { RefreshTokenCallbackResponse } from 'react-auth-kit/dist/types'
import { appConfig } from '../../../common/utils/config'
import calculateTokenLifetime from '../../utils/token-lifetime'
import { parseToken } from '../../utils/token-parser'

interface RefreshEndpointResponse {
  accessToken: string
  refreshToken: string
}

async function getTokens(refreshToken: string): Promise<RefreshEndpointResponse> {
  const url = `${appConfig.rest.url}/auth/refresh`

  const params: AxiosRequestConfig = {
    method: 'GET',
    url,
    headers: { Authorization: `Bearer ${refreshToken}` },
    validateStatus: (status) => status >= 200 && status < 300,
  }

  const response = await axios.request<RefreshEndpointResponse>({ ...params })

  return {
    accessToken: response.data.accessToken,
    refreshToken: response.data.refreshToken,
  }
}

const refreshApi = createRefresh({
  interval: 10,
  refreshApiCallback: async ({ refreshToken }): Promise<RefreshTokenCallbackResponse> => {
    try {
      if (!refreshToken) {
        throw new Error('No refresh token')
      }

      const { accessToken: newAuthToken, refreshToken: newRefreshToken } = await getTokens(refreshToken)

      if (!newAuthToken || !newRefreshToken) {
        throw new Error('Invalid refresh response')
      }

      const accessTokenInfo = parseToken(newAuthToken)
      const refreshTokenInfo = parseToken(newRefreshToken)

      return {
        isSuccess: true,
        newAuthToken,
        newRefreshToken,
        newAuthTokenExpireIn: calculateTokenLifetime(accessTokenInfo),
        newRefreshTokenExpiresIn: calculateTokenLifetime(refreshTokenInfo),
        newAuthUserState: accessTokenInfo,
      }
    } catch (error) {
      console.error(error)
      return {
        isSuccess: false,
        newAuthToken: '',
        newRefreshToken: '',
      }
    }
  },
})

export default refreshApi
