// lib
import * as React from 'react';
import _pick from 'lodash/pick';
import _omit from 'lodash/omit';
import { useMutation } from '@apollo/client';

// hooks
import { useLoginInfo } from 'contexts/LoginContext';
import { useSnackbar } from 'contexts/snackbarContext';

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
  isLoading: boolean;
  onAction: (action: FormAction<UserProfile>) => void;
} => {
  const { onInfo, onSuccess, onFailure } = useSnackbar();

  const [mutationFn, { loading }] = useMutation<
    { updateOneUser: UserProfile },
    { query: { _id: string }; set: Partial<UserProfile> }
  >(SAVE_USER_MUTATION);

  const { user } = useLoginInfo();

  const onSave = React.useCallback(
    async (profile: UserProfile) => {
      if (!user?.id) return;
      onInfo('Saving Profile...');
      try {
        await mutationFn({
          variables: { query: { _id: user?.id ?? '' }, set: adaptProfile(profile) },
        });
        onSuccess('Profile Saved Successfully :)');
      } catch {
        onFailure('Some error Ocurred :(');
      }
    },
    [mutationFn, onFailure, onInfo, onSuccess, user?.id],
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
    isLoading: loading,
    onAction,
  };
};
