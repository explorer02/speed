// lib
import { memo } from 'react';

// components
import { Box } from '@mui/material';

// hooks
import { useProfileForm } from './useProfileForm';
import { useSaveProfile } from './useSaveProfile';

// types
import { SxProps } from '@mui/system';
import { Form } from 'reusable/form';
import { LAYOUT } from './layout';
import { FIELD_MAP } from './fields';

const ProfileForm = ({ sx }: { sx?: SxProps }): JSX.Element => {
  const { value, onAction: _onAction, isLoading } = useProfileForm();

  const { isLoading: isSavingUserProfile, onAction } = useSaveProfile({
    onAction: _onAction,
  });

  return (
    <Box sx={sx}>
      <Form
        loading={isLoading || isSavingUserProfile}
        layout={LAYOUT}
        fieldMap={FIELD_MAP}
        onAction={onAction}
        value={value}
        py={5}
        config={{ submit: { label: 'Update' } }}
      />
    </Box>
  );
};

const MemoizedProfileForm = memo(ProfileForm);
MemoizedProfileForm.displayName = 'MemoizedProfileForm';

export { MemoizedProfileForm as ProfileForm };
