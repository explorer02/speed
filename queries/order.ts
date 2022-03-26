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

export const FETCH_ONE_ORDER = gql`
  query FetchOrder($query: OrderQueryInput!) {
    order(query: $query) {
      ...OrderFields
    }
  }
  ${USER_ORDER_FRAGMENT}
`;
