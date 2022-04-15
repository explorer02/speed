// lib
import { useCallback } from 'react';
import { gql, FetchResult, useMutation } from '@apollo/client';

const MUTATION = gql`
  mutation UpdateBaseItem($query: ItemQueryInput, $set: ItemUpdateInput!) {
    updateOneItem(query: $query, set: $set) {
      _id
      description
      label
      unit
    }
  }
`;

type TData = { insertOneItem: { _id: string } };
type TVariables = {
  query: {
    _id: string;
  };
  set: {
    label: string;
    description: string;
    unit: string;
  };
};

type SaveFn = (
  _id: string,
  vars: TVariables['set'],
) => Promise<FetchResult<TData, Record<string, any>, Record<string, any>>>;

type UseUpdateBaseItemMutation = () => {
  saveData: SaveFn;
  loading: boolean;
};

export const useUpdateBaseItemMutation: UseUpdateBaseItemMutation = () => {
  const [mutationFn, { loading }] = useMutation<TData, TVariables>(MUTATION);

  const saveData: SaveFn = useCallback(
    (_id, vars) => mutationFn({ variables: { query: { _id }, set: vars } }),
    [mutationFn],
  );
  return { saveData, loading };
};
