// lib
import { useMutation, gql } from '@apollo/client';
import { useCallback } from 'react';

// types
import { StringAnyMap } from 'types/generic';

const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($input: OrderInsertInput!) {
    createOrder(input: $input) {
      _id
    }
  }
`;

export type OrderInsertInput = {
  store: {
    link: string;
  };
  user: {
    link: string;
  };
  totalAmount: number;
  items: {
    price: number;
    quantity: number;
    item: string;
  }[];
};

type UseCreateOrderMutation = () => {
  saveOrder: (order: OrderInsertInput) => Promise<StringAnyMap>;
  loading: boolean;
};

export const useCreateOrderMutation: UseCreateOrderMutation = () => {
  const [mutationFn, { loading }] = useMutation<
    { createOrder: StringAnyMap },
    { input: OrderInsertInput }
  >(CREATE_ORDER_MUTATION, { refetchQueries: ['FetchUserOrders'], awaitRefetchQueries: true });
  const saveOrder = useCallback(
    (input: OrderInsertInput): Promise<StringAnyMap> =>
      mutationFn({
        variables: {
          input,
        },
      }),
    [mutationFn],
  );
  return { saveOrder, loading };
};
