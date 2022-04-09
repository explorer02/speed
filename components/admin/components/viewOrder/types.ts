// constants
import { ACTION_TYPES } from './constants';

// types
import { Store } from 'types/store';

export type Action =
  | {
      type: typeof ACTION_TYPES.CHANGE_STORE;
      payload: {
        store: Store;
      };
    }
  | {
      type: typeof ACTION_TYPES.CHANGE_START_TIME | typeof ACTION_TYPES.CHANGE_END_TIME;
      payload: {
        date: number;
      };
    }
  | {
      type: typeof ACTION_TYPES.CHANGE_STATUS;
      payload: {
        statuses: string[];
      };
    }
  | {
      type: typeof ACTION_TYPES.SUBMIT;
    };

export type OnAction = (action: Action) => void;

export type ActionState = {
  selectedStore: Store;
  startTime: number;
  endTime: number;
  statuses: string[];
};
