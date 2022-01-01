// lib
import * as React from 'react';

// hooks
import { useLoginInfo } from 'contexts/LoginContext';
import { useFireStoreQuery } from 'hooks/firebase';

// helpers
import { getCurrentUserProfileQuery } from './helper';

// constants
import { EMPTY_OBJECT } from 'constants/empty';

// types
import { UserProfile } from 'types/profile';

const INITIAL_VALUES: UserProfile = EMPTY_OBJECT;

const ACTION_TYPES = {
  UPDATE: 'update' as const,
  BATCH_UPDATE: 'batchUpdate' as const,
};
type Action =
  | {
      type: typeof ACTION_TYPES.UPDATE;
      payload: {
        id: string;
        subid?: string;
        value: string | number;
      };
    }
  | {
      type: typeof ACTION_TYPES.BATCH_UPDATE;
      payload: Partial<UserProfile>;
    };

const REGEX_VALUES = {
  name: /[a-zA-Z ]+/,
  address: {
    pinCode: /\d+/,
  },
};
const validator = ({
  id,
  subid,
  value,
}: {
  id: string;
  subid?: string;
  value: string;
}): string | number => {
  switch (id) {
    case 'name': {
      const regexResult = value.match(REGEX_VALUES[id]) ?? [];
      return regexResult.join('');
    }
    case 'location': {
      return parseFloat(value);
    }
    case 'address': {
      switch (subid) {
        case 'pinCode': {
          const regexResult = value.match(REGEX_VALUES[id][subid]) ?? [];
          return regexResult.join('').substring(0, 6);
        }
        default:
          return value;
      }
    }
    default:
      return value;
  }
};

const formReducer = (state: UserProfile, action: Action): UserProfile => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE: {
      const { id, subid, value } = action.payload;
      if (subid) {
        return {
          ...state,
          [id]: {
            // @ts-ignore
            ...state[id],
            [subid]: value,
          },
        };
      }
      return { ...state, [id]: value };
    }
    case ACTION_TYPES.BATCH_UPDATE: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};

export const useProfileForm = (): {
  value: UserProfile;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
} => {
  const [formValue, onAction] = React.useReducer(formReducer, INITIAL_VALUES);

  const { user } = useLoginInfo();
  const phone = user?.phoneNumber as string | undefined;

  const query = React.useMemo(() => getCurrentUserProfileQuery(phone), [phone]);
  const { data } = useFireStoreQuery<UserProfile>(query);

  React.useEffect(() => {
    if (data) {
      onAction({ type: ACTION_TYPES.BATCH_UPDATE, payload: data });
    }
  }, [data]);

  const handleChange = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    const {
      dataset: { id = '', subid },
      value,
    } = ev.target;

    onAction({
      type: ACTION_TYPES.UPDATE,
      payload: {
        id,
        subid,
        value: validator({ id, subid, value }),
      },
    });
  }, []);
  return { value: formValue, onChange: handleChange };
};
