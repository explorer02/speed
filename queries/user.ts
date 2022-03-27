import { gql } from '@apollo/client';

// queries
import { USER_ORDER_FRAGMENT } from './order';

export const USER_FRAGMENT = gql`
  fragment UserFields on User {
    _id
    name
    phone
    address {
      area
      city
      houseNumber
      landmark
      locality
      pinCode
      state
      street
    }
    location {
      lat
      lng
    }
  }
`;

export const FETCH_USER_QUERY = gql`
  query FetchUser($query: UserQueryInput) {
    user(query: $query) {
      ...UserFields
    }
  }
  ${USER_FRAGMENT}
`;

export const FETCH_USER_ORDERS_QUERY = gql`
  query FetchUserOrders($query: UserQueryInput) {
    user(query: $query) {
      _id
      orders {
        ...OrderFields
      }
    }
  }
  ${USER_ORDER_FRAGMENT}
`;
