// types
import { Order } from 'types/order';
import { Item } from 'types/store';

export const getItemLabel = (item: Item): string => item.item.label;
export const getItemId = (item: Item): string => item.item._id;
export const getItemDescription = (item: Item): string => item.item.description;
export const getItemUnit = (item: Item): string => item.item.unit;
export const areItemsSame = (item1?: Item, item2?: Item): boolean => item1?._id === item2?._id;

export const getOrderId = (order: Order): string => order._id;
export const getStoreNameFromOrder = (order: Order): string => order.store?.name ?? 'UNKNOWN';
export const getUserNameFromOrder = (order: Order): string => order.user?.name ?? 'UNKNOWN';
