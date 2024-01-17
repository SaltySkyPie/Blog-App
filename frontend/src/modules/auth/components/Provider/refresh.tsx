import axios, { AxiosRequestConfig } from 'axios'
import { useEffect } from 'react'
import { createRefresh, useSignIn } from 'react-auth-kit'
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

export const refreshApi = createRefresh({
  interval: 10,
  refreshApiCallback: async ({ refreshToken, authToken }): Promise<RefreshTokenCallbackResponse> => {
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
        newAuthToken: authToken ?? '',
        newRefreshToken: refreshToken,
      }
    }
  },
})

export const useRefreshUserOnLoad = (authName: string) => {
  const signIn = useSignIn()

  useEffect(() => {
    const refresh = async () => {
      try {
        // check if refresh token exists and has not expired

        const refreshToken = localStorage.getItem(authName.concat('_refresh'))

        if (!refreshToken) {
          return
        }
        const refreshTokenLifetime = calculateTokenLifetime(parseToken(refreshToken))

        if (refreshTokenLifetime <= 0) {
          return
        }

        // if yes, refresh user

        const tokens = await getTokens(refreshToken)

        if (!tokens.accessToken || !tokens.refreshToken) {
          throw new Error('Invalid refresh response')
        }

        const accessTokenInfo = parseToken(tokens.accessToken)
        const refreshTokenInfo = parseToken(tokens.refreshToken)

        signIn({
          token: tokens.accessToken,
          tokenType: 'Bearer',
          // token expiresIn - convert to minutes as react-auth-kit expects minutes
          expiresIn: calculateTokenLifetime(accessTokenInfo),
          refreshToken: tokens.refreshToken,
          refreshTokenExpireIn: calculateTokenLifetime(refreshTokenInfo),
          authState: accessTokenInfo,
        })

        // if no, do nothing
      } catch (error) {
        console.error(error)
        // remove tokens from local storage since they are invalid
        localStorage.removeItem(authName.concat('_auth'))
        localStorage.removeItem(authName.concat('_refresh'))
      }
    }

    void refresh()
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authName])

  return null
}
