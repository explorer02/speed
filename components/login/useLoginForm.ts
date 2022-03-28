// lib
import { useState, useCallback } from 'react';
import { RealmApp } from 'config/realm';
import _isEmpty from 'lodash/isEmpty';
import { Credentials } from 'realm-web';

// hooks
import { SnackbarState, useSnackbar } from 'reusable/snackbarOverlay';
import { useLoginInfo } from 'contexts/LoginContext';

// constants
import { FormAction, useForm } from 'reusable/form';

type State = {
  email: string;
  password: string;
};
const INITIAL_VALUE: State = {
  email: '',
  password: '',
};

const validator = (values: State): boolean =>
  !!values.email.match(/^\S.*@\S+$/)?.length && values.password.length >= 6;

type UseLoginForm = (params: {
  isLoginMode: boolean;
  onSuccess?: () => void;
  setLoginMode: () => void;
}) => {
  onAction: (action: FormAction<State>) => void;
  values: State;
  isSubmitDisabled: boolean;
  snackbarState: SnackbarState;
  loading: boolean;
};

export const useLoginForm: UseLoginForm = ({ isLoginMode, onSuccess, setLoginMode }) => {
  const { state: snackbarState, showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const { setLoginState } = useLoginInfo();

  const handleLogin = useCallback(
    async (values: State) => {
      showSnackbar('Logging in', 'info');
      setLoading(true);
      try {
        const user = await RealmApp.logIn(Credentials.emailPassword(values.email, values.password));

        if (_isEmpty(user.customData)) {
          await fetch('/api/createUser', {
            body: JSON.stringify({
              linkId: user.id,
            }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
          });
        }

        showSnackbar('Success!', 'success');

        setTimeout(() => {
          setLoginState({ isLoggedIn: true, user });
          setTimeout(() => {
            onSuccess?.();
          }, 300);
        }, 200);
      } catch (err: any) {
        showSnackbar(err?.error, 'error');
      } finally {
        setLoading(false);
      }
    },
    [onSuccess, setLoginState, showSnackbar],
  );

  const handleRegister = useCallback(
    async (values: State) => {
      showSnackbar('Creating new User...', 'info');
      setLoading(true);
      try {
        await RealmApp.emailPasswordAuth.registerUser(values);
        showSnackbar('Success! Please check your email and confirm it', 'success');
        setLoginMode();
      } catch (err: any) {
        showSnackbar(err?.error, 'error');
      } finally {
        setLoading(false);
      }
    },
    [setLoginMode, showSnackbar],
  );

  const { values, onAction, isValidated } = useForm({
    initialValues: INITIAL_VALUE,
    onSubmit: isLoginMode ? handleLogin : handleRegister,
    validator,
  });

  return { onAction, values, isSubmitDisabled: !isValidated, snackbarState, loading };
};
