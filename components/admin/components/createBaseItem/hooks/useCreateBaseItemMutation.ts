// lib
import { useCallback } from 'react';
import { gql, FetchResult, useMutation } from '@apollo/client';

const MUTATION = gql`
  mutation CreateBaseItem($data: ItemInsertInput!) {
    insertOneItem(data: $data) {
      _id
    }
  }
`;

type TData = { insertOneItem: { _id: string } };
type TVariables = {
  data: {
    label: string;
    description: string;
    unit: string;
  };
};

type UseCreateBaseItemMutation = () => {
  saveData: (
    vars: TVariables['data'],
  ) => Promise<FetchResult<TData, Record<string, any>, Record<string, any>>>;
  loading: boolean;
};

export const useCreateBaseItemMutation: UseCreateBaseItemMutation = () => {
  const [mutationFn, { loading }] = useMutation<TData, TVariables>(MUTATION);

  const saveData = useCallback(
    (vars: TVariables['data']) => mutationFn({ variables: { data: vars } }),
    [mutationFn],
  );
  return { saveData, loading };
};
