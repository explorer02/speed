// lib
import * as React from 'react';

// components
import { Typography, Grid, ButtonGroup, Button } from '@mui/material';
import { SnackBarOverlay, useSnackbar } from 'reusable/snackbarOverlay';

// hooks
import { useLoginForm } from './useLoginForm';
import { useToggle } from 'hooks/useToggle';

// constants
import { LAYOUT } from './layout';

// types
import { FIELD_MAP } from './fields';
import { Form } from 'reusable/form';

const LoginForm = (): JSX.Element => {
  const { value: isLoginMode, set: setLoginMode, unset: setRegisterMode } = useToggle(true);

  const { onAction, values, isSubmitDisabled, snackbarState, loading } = useLoginForm({
    isLoginMode,
  });

  return (
    <>
      <div id="sign-in-button" />
      <SnackBarOverlay {...snackbarState} />
      <Grid container gap={5} justifyContent="center">
        <Grid item container justifyContent="center" alignItems="center" gap={2} direction="row">
          <Button
            sx={{ fontSize: '25px' }}
            onClick={setLoginMode}
            variant={isLoginMode ? 'outlined' : 'text'}
          >
            Login
          </Button>
          <Button
            sx={{ fontSize: '25px' }}
            onClick={setRegisterMode}
            variant={!isLoginMode ? 'outlined' : 'text'}
          >
            Register
          </Button>
        </Grid>
        <Form
          layout={LAYOUT}
          fieldMap={FIELD_MAP}
          onAction={onAction}
          value={values}
          loading={loading}
          config={{
            submit: {
              disabled: isSubmitDisabled,
              label: isLoginMode ? 'Login' : 'Register',
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
