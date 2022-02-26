// lib
import * as React from 'react';

// hooks
import { useLoginInfo } from 'contexts/LoginContext';
import {
  useFirestoreDocumentData,
  useFirestoreDocumentMutation,
} from '@react-query-firebase/firestore';
import { SnackbarState, useSnackbar } from 'reusable/snackbarOverlay';

// helpers
import { getUserProfileDocRef } from 'helper/docReference';

// constants
import { FormAction, FORM_ACTIONS } from 'reusable/form';
import { USER_COLLECTION } from 'constants/collections';

// types
import { UserProfile } from 'types/profile';

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

  const { user } = useLoginInfo();
  const phone = user?.phoneNumber;

  const userProfileDocRef = React.useMemo(() => getUserProfileDocRef(phone ?? ''), [phone]);

  const { refetch } = useFirestoreDocumentData<UserProfile>(
    [USER_COLLECTION, user?.phoneNumber],
    userProfileDocRef,
  );

  const { mutateAsync, isLoading } = useFirestoreDocumentMutation(userProfileDocRef);

  const onSave = React.useCallback(
    async (profile: UserProfile) => {
      if (!phone) return;
      showSnackbar('Saving Profile...', 'info');
      try {
        await mutateAsync(profile);
        await refetch();
        showSnackbar('Profile Saved Successfully :)', 'success');
      } catch {
        showSnackbar('Some error Ocurred :(', 'error');
      }
    },
    [mutateAsync, phone, refetch, showSnackbar],
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
    isLoading,
    onAction,
  };
};
