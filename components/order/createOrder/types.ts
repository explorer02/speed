// constants
import { ACTION_TYPES } from './constants';

// types
import { Item, Store } from 'types/store';

export type Action =
  | {
      type: typeof ACTION_TYPES.CHANGE_STORE;
      payload: {
        store: Store;
      };
    }
  | {
      type: typeof ACTION_TYPES.UPDATE_ITEMS;
      payload: {
        items: Item[];
      };
    }
  | {
      type: typeof ACTION_TYPES.REMOVE_ITEM;
      payload: {
        item: Item;
      };
    }
  | {
      type: typeof ACTION_TYPES.DECREASE_ITEM_QUANTITY;
      payload: {
        index: number;
      };
    }
  | {
      type: typeof ACTION_TYPES.INCREASE_ITEM_QUANTITY;
      payload: {
        index: number;
      };
    };

export type OnAction = (action: Action) => void;
