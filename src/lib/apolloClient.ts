import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context'

const authLink = new SetContextLink((_, context) => {
    const token = localStorage.getItem('token');
    // fallback to empty headers object
    const existingHeaders = (context as Record<string, unknown>).headers ?? {};

    return {
        headers: {
            ...existingHeaders,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});


const GRAPHQL_URL = import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:4000/'; // 👈 use dev/mock server

const httpLink = new HttpLink({ uri: GRAPHQL_URL, })

// Combine links and create the client
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([authLink, httpLink]),
})

export default client;
