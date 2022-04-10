import { gql } from '@apollo/client';

export const USER_ORDER_FRAGMENT = gql`
  fragment OrderFields on Order {
    _id
    items {
      price
      quantity
      item {
        _id
        label
        unit
      }
    }
    store {
      _id
      name
      address
    }
    totalAmount
    createdOn
    updatedOn
    status
  }
`;

export const STORE_ORDER_FRAGMENT = gql`
  fragment OrderFields on Order {
    _id
    items {
      price
      quantity
      item {
        _id
        label
        unit
      }
    }
    user {
      _id
      name
    }
    totalAmount
    createdOn
    status
  }
`;

export const FETCH_ONE_ORDER = gql`
  query FetchOrder($query: OrderQueryInput!) {
    order(query: $query) {
      ...OrderFields
    }
  }
  ${USER_ORDER_FRAGMENT}
`;

export const FETCH_ORDER_OF_STORE = gql`
  query ($query: OrderQueryInput) {
    orders(query: $query) {
      ...OrderFields
    }
  }
  ${STORE_ORDER_FRAGMENT}
`;
