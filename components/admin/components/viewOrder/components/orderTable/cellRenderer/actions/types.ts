// constants
import { ACTION_TYPES } from './constants';
import { ORDER_STATUS } from 'constants/order';

// types
import { ValueOf } from 'types/generic';

export type Action = {
  type: typeof ACTION_TYPES.MOVE_ORDER;
  payload: {
    status: ValueOf<typeof ORDER_STATUS>;
  };
};

export type OnAction = (action: Action) => void;
