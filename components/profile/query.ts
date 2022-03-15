import { gql } from 'apollo-boost';

const USER_FRAGMENT = gql`
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

export const SAVE_USER_MUTATION = gql`
  mutation SaveUser($set: UserUpdateInput!, $query: UserQueryInput) {
    updateOneUser(set: $set, query: $query) {
      ...UserFields
    }
  }
  ${USER_FRAGMENT}
`;
