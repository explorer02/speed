// lib
import * as React from 'react';
import _cloneDeep from 'lodash/cloneDeep';
import _set from 'lodash/set';
import _merge from 'lodash/merge';

// hooks
import { useFirestoreDocumentData } from '@react-query-firebase/firestore';

// helpers
import { fetchGeoAddress } from 'helper/geoAddress';
import { getUserProfileDocRef } from 'helper/docReference';
import { useLoginInfo } from 'contexts/LoginContext';

// constants
import { USER_COLLECTION } from 'constants/collections';

// types
import { UserProfile } from 'types/profile';
import { FORM_ACTIONS } from 'reusable/form/constants';
import { FormAction } from 'reusable/form';
import { FIELDS, FIELD_MAP } from './fields';

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
  onAction: (action: FormAction<UserProfile>) => void;
  isLoading: boolean;
} => {
  const [state, setState] = React.useState(INITIAL_VALUES);

  const { user } = useLoginInfo();

  const userProfileDocRef = React.useMemo(
    () => getUserProfileDocRef(user?.phoneNumber ?? ''),
    [user?.phoneNumber],
  );

  const { data, isLoading: userLoading } = useFirestoreDocumentData<UserProfile>(
    [USER_COLLECTION, user?.phoneNumber],
    userProfileDocRef,
  );

  console.log(data);

  React.useEffect(() => {
    if (data) {
      const newValues = _cloneDeep(INITIAL_VALUES);
      setState(_merge(newValues, data));
    }
  }, [data]);

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
    (action: FormAction<UserProfile>) => {
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
    isLoading: userLoading,
  };
};
