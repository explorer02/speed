export const ACTION_TYPES = {
  STORE_CHANGE: 'STORE_CHANGE',
  REFRESH: 'REFRESH',
  SORT_FIELD_CHANGE: 'SORT_FIELD_CHANGE',
  SORT_ORDER_CHANGE: 'SORT_ORDER_CHANGE',
  SEARCH_INPUT_CHANGE: 'SEARCH_INPUT_CHANGE',
  TOGGLE_ITEM: 'TOGGLE_ITEM',
  CLEAR_SELECTION: 'CLEAR_SELECTION',
  CONTINUE_TO_ORDER: 'CONTINUE_TO_ORDER',
} as const;

export const SORT_FIELDS = {
  NAME: { label: 'Name', sortKey: 'label' },
  PRICE: { label: 'Price', sortKey: 'price' },
  QUANTITY: { label: 'Quantity', sortKey: 'quantity' },
} as const;
