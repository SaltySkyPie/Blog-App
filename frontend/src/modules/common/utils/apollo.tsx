import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { appConfig } from './config'

const client = new ApolloClient({
  uri: appConfig.graphql.url,
  cache: new InMemoryCache(),
})

export const ApolloAppProvider = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
