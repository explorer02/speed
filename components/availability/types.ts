// constants
import { ACTION_TYPES } from './constants';

// types
import { Store } from 'types/store';

type SORT_ORDER = 'asc' | 'desc';

export type ActionState = {
  searchInput: string;
  sortBy: {
    field: string;
    order: SORT_ORDER;
  };
};

type Action =
  | {
      type: typeof ACTION_TYPES.REFRESH;
    }
  | {
      type: typeof ACTION_TYPES.STORE_CHANGE;
      payload: {
        store: Store;
      };
    }
  | {
      type: typeof ACTION_TYPES.SORT_FIELD_CHANGE;
      payload: {
        field: string;
      };
    }
  | {
      type: typeof ACTION_TYPES.SORT_ORDER_CHANGE;
    }
  | {
      type: typeof ACTION_TYPES.SEARCH_INPUT_CHANGE;
      payload: {
        searchInput: string;
      };
    }
  | {
      type: typeof ACTION_TYPES.TOGGLE_ITEM;
      payload: {
        id: string;
      };
    }
  | {
      type: typeof ACTION_TYPES.CLEAR_SELECTION;
    }
  | {
      type: typeof ACTION_TYPES.CONTINUE_TO_ORDER;
    };

export type OnAction = (action: Action) => void;
