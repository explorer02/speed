// lib
import * as React from 'react';
import _pick from 'lodash/pick';
import _omit from 'lodash/omit';
import { useMutation } from '@apollo/client';

// hooks
import { useLoginInfo } from 'contexts/LoginContext';
import { SnackbarState, useSnackbar } from 'reusable/snackbarOverlay';

// helpers
import { stripTypename } from 'helper/stripTypenames';

// queries
import { SAVE_USER_MUTATION } from './query';

// constants
import { FormAction, FORM_ACTIONS } from 'reusable/form';

// types
import { UserProfile } from 'types/profile';

const adaptProfile = (profile: UserProfile): UserProfile =>
  stripTypename(
    _omit(
      {
        ...profile,
        location: _pick(profile.location, ['lat', 'lng']),
      },
      '_id',
    ),
  ) as UserProfile;

export const useSaveProfile = ({
  onAction: _onAction,
}: {
  onAction: (action: FormAction<UserProfile>) => void;
}): {
  snackbarState: SnackbarState;
  isLoading: boolean;
  onAction: (action: FormAction<UserProfile>) => void;
} => {
  const { state: snackbarState, showSnackbar } = useSnackbar();

  const [mutationFn, { loading }] = useMutation<
    { updateOneUser: UserProfile },
    { query: { phone: string }; set: Partial<UserProfile> }
  >(SAVE_USER_MUTATION);

  const { user } = useLoginInfo();
  const phone = user?.phoneNumber;

  const onSave = React.useCallback(
    async (profile: UserProfile) => {
      if (!phone) return;
      showSnackbar('Saving Profile...', 'info');
      try {
        await mutationFn({
          variables: { query: { phone: phone.substring(3) }, set: adaptProfile(profile) },
        });
        showSnackbar('Profile Saved Successfully :)', 'success');
      } catch {
        showSnackbar('Some error Ocurred :(', 'error');
      }
    },
    [mutationFn, phone, showSnackbar],
  );

  const onAction = React.useCallback(
    (action: FormAction<UserProfile>) => {
      switch (action.type) {
        case FORM_ACTIONS.ON_SUBMIT:
          onSave(action.payload.value);
          break;
        default:
          _onAction(action);
      }
    },
    [_onAction, onSave],
  );

  return {
    snackbarState,
    isLoading: loading,
    onAction,
  };
};
