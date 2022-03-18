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
    }
    totalAmount
    createdOn
    updatedOn
    status
  }
`;
