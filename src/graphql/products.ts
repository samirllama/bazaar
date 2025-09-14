// src/graphql/products.ts
import { gql } from '@apollo/client'

export const GET_PRODUCTS = gql`
  query GetProducts($limit: Int = 50) {
    products(limit: $limit) {
      id
      title
      description
      priceCents
      createdAt
      seller {
        id
        name
        user {
          id
          email
        }
      }
    }
  }
`

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      title
      description
      priceCents
      createdAt
      seller {
        id
        name
        user {
          id
          email
        }
      }
    }
  }
`
