import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { useProfile } from '@app/modules/auth/utils/useProfile'
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

  const user = useProfile()?.id
  // clear memory cache when user changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoCache = useMemo(() => new InMemoryCache(), [user])

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
