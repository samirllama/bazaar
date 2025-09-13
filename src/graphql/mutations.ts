import { gql } from '@apollo/client';

export const CREATE_LISTING = gql`
  mutation CreateListing($input: CreateListingInput!) {
    createListing(input: $input) {
      id
      priceCents
      active
      createdAt
      product {
        id
        title
      }
    }
  }
`;
