import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
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

  const client = useMemo(
    () =>
      new ApolloClient({
        link: headerLink.concat(httpLink),
        cache: new InMemoryCache(),
      }),
    [headerLink, httpLink]
  )
  return client
}

export const ApolloAppProvider = ({ children }: { children: React.ReactNode }) => {
  const authHeader = useAuthHeader()

  const client = useApolloClient(authHeader)

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
