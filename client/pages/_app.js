import { Provider } from "react-redux";
import store from "../store/store";
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { WebSocket } from "ws";
import { CookiesProvider } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'

// const link = new GraphQLWsLink(createClient({
//   url: 'ws://localhost:4000/graphql',
//   webSocketImpl: WebSocket
// }));

// const client = new ApolloClient({
//   link: typeof window === 'undefined' ? httpLink : link,
//   uri: "http://localhost:4000/graphql",
//   cache: new InMemoryCache()
// })

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
})

const wsLink = () => {
  return new GraphQLWsLink(createClient({
    url: 'ws://localhost:4000/graphql'
  }))
}

const apolloClient = new ApolloClient({
  link: typeof window === 'undefined' ? httpLink : wsLink(),
  cache: new InMemoryCache()
})

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <CookiesProvider>
          <Component {...pageProps} />
        </CookiesProvider>
      </ApolloProvider>
    </Provider>
  )
}

export default MyApp
