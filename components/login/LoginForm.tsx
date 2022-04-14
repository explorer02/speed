// lib
import { memo } from 'react';

// components
import { Grid, Button } from '@mui/material';

// hooks
import { useLoginForm } from './useLoginForm';
import { useToggle } from 'hooks/useToggle';

// constants
import { LAYOUT } from './layout';

// types
import { FIELD_MAP } from './fields';
import { Form } from 'reusable/form';

const LoginForm = ({ onSuccess }: { onSuccess?: () => void }): JSX.Element => {
  const { value: isLoginMode, set: setLoginMode, unset: setRegisterMode } = useToggle(true);

  const { onAction, values, isSubmitDisabled,  loading } = useLoginForm({
    isLoginMode,
    onSuccess,
    setLoginMode,
  });

  return (
    <Grid container gap={5} justifyContent="center" p={2}>
      <Grid item container justifyContent="center" alignItems="center" gap={2} direction="row">
        <Button onClick={setLoginMode} variant={isLoginMode ? 'outlined' : 'text'}>
          Login
        </Button>
        <Button onClick={setRegisterMode} variant={!isLoginMode ? 'outlined' : 'text'}>
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
  );
};

const MemoizedLoginForm = memo(LoginForm);
MemoizedLoginForm.displayName = 'MemoizedLoginForm';

export { MemoizedLoginForm as LoginForm };
