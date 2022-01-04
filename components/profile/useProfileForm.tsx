// lib
import * as React from 'react';

// helpers
import { formValidator } from './helper';

// constants
import { Action, ACTION_TYPES } from './actions';

// types
import { UserProfile } from 'types/profile';
import { useProfileInfo } from 'contexts/ProfileContext';

const INITIAL_VALUES: UserProfile = {
  phone: '',
  name: '',
  address: {
    houseNumber: '',
    street: '',
    locality: '',
    area: '',
    landmark: '',
    city: '',
    state: '',
    pinCode: '',
  },
  location: { latitude: 0.0, longitude: 0.0 },
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
  dispatcher: React.Dispatch<Action>;
  loading?: boolean;
} => {
  const [formValue, onAction] = React.useReducer(formReducer, INITIAL_VALUES);

  const { loading, profile } = useProfileInfo();
  React.useEffect(() => {
    if (profile) {
      onAction({ type: ACTION_TYPES.BATCH_UPDATE, payload: profile });
    }
  }, [profile]);

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
        value: formValidator({ id, subid, value }),
      },
    });
  }, []);
  return { value: formValue, onChange: handleChange, dispatcher: onAction, loading };
};
