// server/graphql/typeDefs.ts
import { gql } from 'graphql-tag'

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    createdAt: String!
  }

  type Seller {
    id: ID!
    userId: ID!         # FK to users
    user: User!
    name: String!
    email: String!
    createdAt: String!
  }

  type Product {
    id: ID!
    title: String!
    description: String
    priceCents: Int!
    seller: Seller!
    createdAt: String!
  }

  input CreateProductInput {
    title: String!
    description: String
    priceCents: Int!
  }

  type Query {
    products(limit: Int = 50): [Product!]!
    product(id: ID!): Product
    sellers: [Seller!]!
    seller(id: ID!): Seller
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    signUp(email: String!, password: String!): AuthPayload!
    signIn(email: String!, password: String!): AuthPayload!
    createProduct(input: CreateProductInput!): Product!
    updateListingPrice(id: ID!, priceCents: Int!): Product!
  }
`
