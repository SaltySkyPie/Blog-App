export type AppConfig = {
    graphql: {
        url: string
        ws: string
    }
    rest: {
        url: string
    }
    }

export const appConfig: AppConfig = {
  graphql: {
    url: import.meta.env.VITE_GRAPHQL_URL as string,
    ws: import.meta.env.VITE_GRAPHQL_WS as string,
  },
  rest: {
    url: import.meta.env.VITE_REST_URL as string,
  },
}
