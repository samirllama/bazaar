// server/dev-server.ts
import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { mockSchema } from '../src/graphql/mocks';
import { typeDefs } from '../src/graphql/schema';

const useSupabase = process.env.USE_SUPABASE === 'true';
const port = Number(process.env.PORT ?? 4000);

async function start() {
    // Lazily import resolvers only when we actually need real DB-backed resolvers.
    // This avoids loading pg/supabase modules when working with mocks.
    const server = useSupabase
        ? new ApolloServer({
            // typeDefs + resolvers style when using DB-backed resolvers
            typeDefs: (typeDefs as unknown) as string,
            resolvers: (await import('./graphql/resolvers')).resolvers,
        } as any)
        : new ApolloServer({
            // If using mocks we pass the executable schema directly
            schema: mockSchema,
        } as any);

    const { url } = await startStandaloneServer(server, {
        listen: { port },
        // context will be accessible to resolvers as the usual GraphQL context
        context: async ({ req }) => {
            return {
                headers: req.headers,
                env: process.env, // handy during dev, remove secrets in public logs
            };
        },
    });

    console.log(`🚀 GraphQL server ready at ${url} (USE_SUPABASE=${useSupabase})`);
}

start().catch((err) => {
    console.error('Server startup error:', err);
    process.exit(1);
});
