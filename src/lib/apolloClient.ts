import {
    ApolloClient, InMemoryCache, HttpLink, ApolloLink
} from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context'

const GRAPHQL_URL = import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:4000/'; // 👈 use dev/mock server
const httpLink = new HttpLink({ uri: GRAPHQL_URL, })
const authLink = new SetContextLink((prevContext, _) => {
    const token = localStorage.getItem("token");
    return {
        ...prevContext,
        headers: {
            ...prevContext.headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

// Combine links and create the client
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([authLink, httpLink]),
})

export default client;
