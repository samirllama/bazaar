// src/graphql/schema.ts
import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Seller {
    id: ID!
    name: String!
    email: String
    createdAt: String!
  }
  type Product {
    id: ID!
    title: String!
    description: String
    priceCents: Int!
    seller: Seller
    createdAt: String
  }
  type Listing {
    id: ID!
    product: Product!
    priceCents: Int!
    active: Boolean!
    createdAt: String
  }

  input CreateListingInput {
    productId: ID!
    priceCents: Int!
  }

  type Query {
    products(limit: Int = 50): [Product!]!
    product(id: ID!): Product
    sellers: [Seller!]!
    seller(id: ID!): Seller
  }

  type Mutation {
    createListing(input: CreateListingInput!): Listing!
    updateListingPrice(id: ID!, priceCents: Int!): Listing!
  }
`;
