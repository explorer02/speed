// constants
import { ACTION_TYPES } from './constants';

// types
import { ValueOf } from 'types/generic';
import { Order } from 'types/order';

type Action = {
  type: ValueOf<typeof ACTION_TYPES>;
  payload: {
    order: Order;
  };
};
export type OnAction = (action: Action) => void;
