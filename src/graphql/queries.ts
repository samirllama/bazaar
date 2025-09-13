import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts($limit: Int!) {
    products(limit: $limit) {
      id
      title
      description
      priceCents
      createdAt
      seller {
        id
        name
        email
      }
    }
  }
`;
