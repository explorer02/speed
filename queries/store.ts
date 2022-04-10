import { gql } from '@apollo/client';
import { STORE_ORDER_FRAGMENT } from './order';

const ITEM_FRAGMENT = gql`
  fragment ItemFields on Item {
    _id
    description
    label
    unit
  }
`;

const STORE_FRAGMENT = gql`
  fragment StoreFields on Store {
    _id
    address
    location {
      lat
      lng
    }
    name
  }
`;

export const FETCH_ALL_STORES = gql`
  query FetchStores {
    stores {
      ...StoreFields
    }
  }
  ${STORE_FRAGMENT}
`;

export const FETCH_STORE_WITH_ITEMS = gql`
  query FetchOneStores($query: StoreQueryInput!) {
    store(query: $query) {
      ...StoreFields
      items {
        item {
          ...ItemFields
        }
        price
        quantity
      }
    }
  }
  ${STORE_FRAGMENT}
  ${ITEM_FRAGMENT}
`;
