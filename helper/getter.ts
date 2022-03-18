// types
import { Order } from 'types/order';
import { Item } from 'types/store';

export const getItemLabel = (item: Item): string => item.item.label;
export const getItemId = (item: Item): string => item.item._id;
export const getItemDescription = (item: Item): string => item.item.description;
export const getItemUnit = (item: Item): string => item.item.unit;

export const getOrderId = (order: Order): string => order._id;
export const getStoreNameFromOrder = (order: Order): string => order.store.name;
