// types
import { Order } from 'types/order';
import { Item } from 'types/store';

export const adaptItemsWithId = (items: Item[]): Item[] =>
  items.map((item) => ({ ...item, _id: item.item._id }));

export const adaptOrderFromGraphQL = (orders: Order[]): Order[] =>
  orders.map((order) => ({
    ...order,
    createdOn: new Date(order.createdOn).getTime(),
    updatedOn: new Date(order.updatedOn).getTime(),
    items: adaptItemsWithId(order.items),
  }));
