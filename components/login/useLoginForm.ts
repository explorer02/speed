// lib
import { useState, useCallback } from 'react';
import { RealmApp } from 'config/realm';
import _isEmpty from 'lodash/isEmpty';
import { Credentials } from 'realm-web';

// hooks
import { useLoginInfo } from 'contexts/LoginContext';
import { useSnackbar } from 'contexts/snackbarContext';

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
  loading: boolean;
};

export const useLoginForm: UseLoginForm = ({ isLoginMode, onSuccess, setLoginMode }) => {
  const { onInfo, onSuccess: triggerOnSuccess, onFailure } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const { setLoginState } = useLoginInfo();

  const handleLogin = useCallback(
    async (values: State) => {
      onInfo('Logging in');
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

        triggerOnSuccess('Success!');

        setTimeout(() => {
          setLoginState({ isLoggedIn: true, user });
          setTimeout(() => {
            onSuccess?.();
          }, 300);
        }, 200);
      } catch (err: any) {
        onFailure(err?.error);
      } finally {
        setLoading(false);
      }
    },
    [onFailure, onInfo, onSuccess, setLoginState, triggerOnSuccess],
  );

  const handleRegister = useCallback(
    async (values: State) => {
      onInfo('Creating new User...');
      setLoading(true);
      try {
        await RealmApp.emailPasswordAuth.registerUser(values);
        triggerOnSuccess('Success! Please check your email and confirm it');
        setLoginMode();
      } catch (err: any) {
        onFailure(err?.error);
      } finally {
        setLoading(false);
      }
    },
    [onFailure, onInfo, setLoginMode, triggerOnSuccess],
  );

  const { values, onAction, isValidated } = useForm({
    initialValues: INITIAL_VALUE,
    onSubmit: isLoginMode ? handleLogin : handleRegister,
    validator,
  });

  return { onAction, values, isSubmitDisabled: !isValidated, loading };
};
