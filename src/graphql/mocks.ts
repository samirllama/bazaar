import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema, MockList } from '@graphql-tools/mock';
import type { GraphQLResolveInfo } from 'graphql';
import { typeDefs } from './schema';

// Helper functions
const randomFromArray = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
const randomPrice = () => Math.floor(Math.random() * 50000) + 10000;
const randomBoolean = () => Math.random() > 0.3;
const nowISOString = () => new Date().toISOString();

const mocks = {
    ID: () => Math.floor(Math.random() * 1000).toString(),
    Int: randomPrice,
    String: () => '🎸 Reverb Guitar',
    Boolean: randomBoolean,

    Query: () => ({
        products: (_: unknown, _args: { limit: number }, _context: unknown, info: GraphQLResolveInfo) => {
            // Read the 'limit' argument from the query AST
            const limitArgNode = info?.fieldNodes[0]?.arguments?.find(arg => arg.name.value === 'limit');
            const limitValue = limitArgNode?.value?.kind === 'IntValue'
                ? parseInt(limitArgNode.value.value, 10)
                : 10;
            console.log("info::", info)
            return new MockList(limitValue);
        },
        // products: (_: any, args: { limit: number }) => new MockList(args.limit || 10),

        sellers: () => new MockList([3, 6]),
    }),

    Product: () => ({
        title: () => randomFromArray(['Vintage Stratocaster', 'Les Paul Custom', 'Fender Jazz Bass']),
        description: () => randomFromArray([
            'A classic guitar with amazing tone',
            'Perfect for recording and live gigs',
            'Well-maintained, mint condition'
        ]),
        priceCents: randomPrice,
        createdAt: nowISOString,
        seller: () => ({}), // resolves with Seller mock
    }),

    Seller: () => ({
        name: () =>
            ['Sammy Strings', 'Fester Fiesta', 'Melody Maker'][
            Math.floor(Math.random() * 3)
            ],
        email: () => 'seller@example.com',
    }),

    Listing: () => ({
        product: () => ({}), // resolves with Product mock
        priceCents: randomPrice,
        active: randomBoolean,
        createdAt: nowISOString,
    }),
};

const baseSchema = makeExecutableSchema({ typeDefs });
export const mockSchema = addMocksToSchema({
    schema: baseSchema,
    mocks,
    preserveResolvers: false, // replace everything with mocks
});
