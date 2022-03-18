// lib
import { gql } from '@apollo/client';

// queries
import { USER_FRAGMENT } from 'queries/user';

export const SAVE_USER_MUTATION = gql`
  mutation SaveUser($set: UserUpdateInput!, $query: UserQueryInput) {
    updateOneUser(set: $set, query: $query) {
      ...UserFields
    }
  }
  ${USER_FRAGMENT}
`;
