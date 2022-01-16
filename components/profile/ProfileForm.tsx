// lib
import * as React from 'react';

// components
import { Box } from '@mui/material';
import { SnackBarOverlay, useSnackbar } from 'reusable/snackbarOverlay';
import { LoadingModal } from 'reusable/loadingModal';

// hooks
import { useProfileForm } from './useProfileForm';
import { useLoginInfo } from 'contexts/LoginContext';
import { useToggle } from 'hooks';
import { useFireStoreMutation } from 'hooks/firebase';

// helpers
import { getUserProfileDocRef } from 'helper/docReference';

// types
import { SxProps } from '@mui/system';
import { Form, FormAction, FORM_ACTIONS } from 'reusable/form';
import { LAYOUT } from './layout';
import { FIELD_MAP } from './fields';

const ProfileForm = ({ sx }: { sx?: SxProps }): React.ReactElement => {
  const { value, onAction, isLoading, valueRef } = useProfileForm();

  const updateUser = useFireStoreMutation();

  const {
    value: isLoadingModalVisible,
    set: showLoadingModal,
    unset: hideLoadingModal,
  } = useToggle();

  const { state: snackbarState, showSnackbar, hideSnackbar } = useSnackbar();

  const { user } = useLoginInfo();
  const phone = user?.phoneNumber as string | undefined;

  const handleSubmit = React.useCallback(async () => {
    if (!phone) return;
    showLoadingModal();
    try {
      const docRef = getUserProfileDocRef(phone);
      await updateUser(docRef, valueRef.current);
      showSnackbar('Data Saved Successfully :)', 'success');
    } catch (err) {
      showSnackbar('Some error Ocurred :(', 'error');
    }
    hideLoadingModal();
  }, [hideLoadingModal, phone, showLoadingModal, showSnackbar, updateUser, valueRef]);

  const handleAction = React.useCallback(
    (action: FormAction) => {
      switch (action.type) {
        case FORM_ACTIONS.ON_SUBMIT:
          handleSubmit();
          break;
        default:
          onAction(action);
      }
    },
    [handleSubmit, onAction],
  );

  return (
    <>
      <LoadingModal open={isLoadingModalVisible || !!isLoading} loadingText="Please wait..." />
      <SnackBarOverlay
        open={snackbarState.open}
        onClose={hideSnackbar}
        message={snackbarState.message}
        severity={snackbarState.severity}
      />
      <Box sx={sx}>
        <Form
          layout={LAYOUT}
          fieldMap={FIELD_MAP}
          onAction={handleAction}
          value={value}
          py={5}
          config={{ submit: { label: 'Update' } }}
        />
      </Box>
    </>
  );
};

const MemoizedProfileForm = React.memo(ProfileForm);
MemoizedProfileForm.displayName = 'MemoizedProfileForm';

export { MemoizedProfileForm as ProfileForm };
