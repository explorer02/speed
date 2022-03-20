// lib
import * as React from 'react';

// components
import { Typography, Grid } from '@mui/material';
import { SnackBarOverlay, useSnackbar } from 'reusable/snackbarOverlay';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

// hooks
import { useLoginForm } from './useLoginForm';

// constants
import { LAYOUT } from './layout';

// types
import { FIELD_MAP } from './fields';
import { Form } from 'reusable/form';

const LoginForm = (): JSX.Element => {
  const { onAction, values, isSubmitDisabled } = useLoginForm();

  return (
    <>
      <div id="sign-in-button" />
      {/* <SnackBarOverlay {...snackbarState} /> */}
      <Grid container gap={5} justifyContent="center">
        <Grid item container justifyContent="center" alignItems="center" gap={2} direction="row">
          <LoginOutlinedIcon fontSize="large" /> <Typography variant="h4">Login</Typography>
        </Grid>
        <Form
          layout={LAYOUT}
          fieldMap={FIELD_MAP}
          onAction={onAction}
          value={values}
          config={{
            submit: {
              disabled: isSubmitDisabled,
            },
          }}
        />
      </Grid>
    </>
  );
};

const MemoizedLoginForm = React.memo(LoginForm);
MemoizedLoginForm.displayName = 'MemoizedLoginForm';

export { MemoizedLoginForm as LoginForm };
