// lib
import * as React from 'react';
import _cloneDeep from 'lodash/cloneDeep';
import _set from 'lodash/set';

// helpers
import { fetchGeoAddress } from 'helper/geoAddress';

// types
import { UserProfile } from 'types/profile';
import { useProfileInfo } from 'contexts/ProfileContext';
import { FORM_ACTIONS } from 'reusable/form/constants';
import { FormAction } from 'reusable/form';
import { FIELDS, FIELD_MAP } from './fields';
import { useLatest } from 'react-use';

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
  location: { lat: 0.0, lng: 0.0, addressText: '' },
};

const updateState = (state: UserProfile, propertyPath: string[], value: any): UserProfile => {
  const newState = _cloneDeep(state);
  _set(newState, propertyPath, value);
  return newState;
};

export const useProfileForm = (): {
  value: UserProfile;
  onAction: (action: FormAction) => void;
  isLoading?: boolean;
  valueRef: React.MutableRefObject<UserProfile>;
} => {
  const [state, setState] = React.useState(INITIAL_VALUES);
  const stateRef = useLatest(state);

  const { loading: profileLoading, profile } = useProfileInfo();

  React.useEffect(() => {
    if (profile) {
      setState(profile);
    }
  }, [profile]);

  const recenter = React.useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (geoLocation) => {
        const location = {
          lat: geoLocation.coords.latitude,
          lng: geoLocation.coords.longitude,
        };
        const addressText = await fetchGeoAddress(location);
        setState((prev) => ({
          ...prev,
          location: {
            lat: geoLocation.coords.latitude,
            lng: geoLocation.coords.longitude,
            addressText,
          },
        }));
      });
    }
  }, []);

  const handleAction = React.useCallback(
    (action: FormAction) => {
      switch (action.type) {
        case FORM_ACTIONS.ON_CHANGE:
          const { id, value } = action.payload;
          const propertyPath = FIELD_MAP[id].propertyPath ?? [id];
          setState((prev) => updateState(prev, propertyPath, value));
          break;

        case FORM_ACTIONS.ON_CLICK:
          switch (action.payload.id) {
            case FIELDS.LOCATION.RECENTER:
              recenter();
              break;
            default:
              break;
          }

          break;
        case FORM_ACTIONS.ON_RESET:
          setState(INITIAL_VALUES);
          break;
        default:
          break;
      }
    },
    [recenter],
  );

  return {
    value: state,
    onAction: handleAction,
    isLoading: profileLoading,
    valueRef: stateRef,
  };
};
