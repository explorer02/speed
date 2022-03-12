// helpers
import { ORDER_STATUS } from 'constants/order';
import { getSingleOrderRef } from 'helper/docReference';
import { mutate } from 'helper/firebaseMutation';

// types
import { Order } from 'types/order';

export const cancelOrder = async (phone: string, order: Order): Promise<void> => {
  const docRef = getSingleOrderRef(phone, order.id);
  await mutate(docRef, { ...order, status: ORDER_STATUS.CANCELLED });
};
