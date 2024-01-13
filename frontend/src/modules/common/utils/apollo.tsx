import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { offsetLimitPagination } from '@apollo/client/utilities'
import { parseToken } from '@app/modules/auth/utils/token-parser'
import { useMemo } from 'react'
import { useAuthHeader } from 'react-auth-kit'
import { appConfig } from './config'

const useApolloClient = (getAuthHeader: () => string) => {
  const headerLink = useMemo(
    () =>
      setContext((_, previousContext) => ({
        headers: {
          ...previousContext.headers,
          authorization: getAuthHeader(),
        },
      })),
    [getAuthHeader]
  )
  const httpLink = useMemo(() => createHttpLink({ uri: appConfig.graphql.url }), [])

  const userId = useMemo(() => {
    const token = getAuthHeader()

    if (!token) return null

    const parsedToken = parseToken(token)
    return parsedToken.id
  }, [getAuthHeader])

  const memoCache = useMemo(
    () =>
      new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              articleComments: offsetLimitPagination(['articleId']),
              articles: offsetLimitPagination(),
            },
          },
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userId]
  )

  const client = useMemo(
    () =>
      new ApolloClient({
        link: headerLink.concat(httpLink),
        cache: memoCache,
      }),
    [headerLink, httpLink, memoCache]
  )
  return client
}

export const ApolloAppProvider = ({ children }: { children: React.ReactNode }) => {
  const authHeader = useAuthHeader()

  const client = useApolloClient(authHeader)

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
