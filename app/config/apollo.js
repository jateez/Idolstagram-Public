const { ApolloClient, InMemoryCache, createHttpLink } = require("@apollo/client");
import { setContext } from "@apollo/client/link/context"
import * as secureStore from "expo-secure-store"

const httpLink = createHttpLink({
  uri: "https://868b-2404-8000-1015-3ef7-a14c-27bc-9f19-4164.ngrok-free.app"
})

const authLink = setContext(async (_, { headers }) => {
  const token = await secureStore.getItemAsync("access_token")

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default client