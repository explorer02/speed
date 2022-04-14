// lib
import { gql, MutationResult, useMutation } from '@apollo/client';
import { useCallback } from 'react';

// constants
import { ORDER_STATUS } from 'constants/order';

// types
import { ValueOf } from 'types/generic';

export const CANCEL_ORDER_MUTATION = gql`
  mutation CancelOrder($query: OrderQueryInput, $set: OrderUpdateInput!) {
    updateOneOrder(query: $query, set: $set) {
      _id
      status
      updatedOn
    }
  }
`;

type Response = {
  updateOneOrder: {
    _id: string;
    status: string;
    createdOn: string;
    updatedOn: string;
    totalAmount: number;
  };
};

type Variables = {
  query: { _id: string };
  set: { status: ValueOf<typeof ORDER_STATUS>; updatedOn: Date };
};

type UpdateFn = (orderId: string, status: ValueOf<typeof ORDER_STATUS>) => Promise<void>;

type UseUpdateOrderStatus = () => [UpdateFn, MutationResult<Response>];

export const useUpdateOrderStatus: UseUpdateOrderStatus = () => {
  const [mutationFn, mutationResult] = useMutation<Response, Variables>(CANCEL_ORDER_MUTATION);

  const updateOrder: UpdateFn = useCallback(
    async (orderId, status) => {
      mutationFn({
        variables: {
          query: {
            _id: orderId,
          },
          set: {
            status,
            updatedOn: new Date(),
          },
        },
      });
    },
    [mutationFn],
  );

  return [updateOrder, mutationResult];
};
