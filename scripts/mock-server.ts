import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone';
import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'

// Define type definitions (schema)
const typeDefs = `
  type Product {
    id: ID!
    title: String!
    price: Float!
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
  }
`

// Define sample resolvers
const resolvers = {
  Query: {
    products: () => [
      { id: '1', title: 'iPhone 15', price: 999 },
      { id: '2', title: 'MacBook Pro', price: 2499 },
    ],
    product: (_: any, args: { id: string }) => ({
      id: args.id,
      title: `Product ${args.id}`,
      price: 123.45,
    }),
  },
}

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server ready at ${url}`);
}

startServer();
