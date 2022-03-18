// lib
import { gql, useMutation } from '@apollo/client';
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
  set: { status: ValueOf<typeof ORDER_STATUS>; updatedOn: string };
};

type UseCancelOrder = () => { cancelOrder: (orderId: string) => Promise<void> };

export const useCancelOrder: UseCancelOrder = () => {
  const [mutationFn] = useMutation<Response, Variables>(CANCEL_ORDER_MUTATION);

  const cancelOrder = useCallback(
    async (orderId: string) => {
      mutationFn({
        variables: {
          query: {
            _id: orderId,
          },
          set: {
            status: ORDER_STATUS.CANCELLED,
            updatedOn: Date.now().toString(),
          },
        },
      });
    },
    [mutationFn],
  );

  return { cancelOrder };
};
