import { UserProfile } from 'types/profile';

export const ACTION_TYPES = {
  UPDATE: 'update' as const,
  BATCH_UPDATE: 'batchUpdate' as const,
};

type UpdateAction = {
  type: typeof ACTION_TYPES.UPDATE;
  payload: {
    id: string;
    subid?: string;
    value: string | number;
  };
};

type BatchUpdateAction = {
  type: typeof ACTION_TYPES.BATCH_UPDATE;
  payload: Partial<UserProfile>;
};

export type Action = UpdateAction | BatchUpdateAction;
