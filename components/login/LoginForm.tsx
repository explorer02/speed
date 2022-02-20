// lib
import * as React from 'react';
import { signInWithPhoneNumber, RecaptchaVerifier } from '@firebase/auth';

// components
import { Typography, Grid } from '@mui/material';
import { SnackBarOverlay, useSnackbar } from 'reusable/snackbarOverlay';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

// hooks
import { useSignInRecaptcha, useWindow, useSafeState } from 'hooks';
import { useLoginForm } from './useLoginForm';

// firebaseConfig
import { auth } from 'firebaseConfig';

// constants
import { LAYOUT } from './layout';

// types
import { ConfirmationResult } from 'firebase/auth';
import { getFieldMap } from './fields';
import { Form } from 'reusable/form';

type LoginState = {
  loading: boolean;
  isOtpSent?: boolean;
};

const INITIAL_LOGIN_STATE: LoginState = {
  loading: false,
  isOtpSent: false,
};

const resetCaptcha = (appVerifier: RecaptchaVerifier | undefined, window: any): void => {
  appVerifier?.render().then((widgetId: number) => {
    (window as any).grecaptcha?.reset(widgetId);
  });
};

const LoginForm = (): JSX.Element => {
  const appVerifier = useSignInRecaptcha();
  const confirmationResult = React.useRef<ConfirmationResult>();

  const window = useWindow();
  const { state: snackbarState, showSnackbar, hideSnackbar } = useSnackbar();

  const [loginState, setLoginState] = useSafeState<LoginState>(INITIAL_LOGIN_STATE);

  const onSignInSubmit = React.useCallback(
    async (phoneNumber: string) => {
      setLoginState({
        loading: true,
      });
      showSnackbar('Sending OTP...', 'info');

      try {
        const _confirmationResult = await signInWithPhoneNumber(
          auth,
          `+91${phoneNumber}`,
          appVerifier!,
        );
        confirmationResult.current = _confirmationResult;
        setLoginState((prev) => ({ ...prev, isOtpSent: true }));
        showSnackbar('OTP Sent to your mobile number...', 'info');
      } catch (err: any) {
        showSnackbar(
          err?.message ?? 'Some error ocurred... Please check the phone number :(',
          'error',
        );
        resetCaptcha(appVerifier, window);
      } finally {
        setLoginState((prev) => ({
          ...prev,
          loading: false,
        }));
      }
    },
    [appVerifier, setLoginState, showSnackbar, window],
  );

  const onVerifyOTP = React.useCallback(
    async (otp: string) => {
      setLoginState({
        loading: true,
      });
      showSnackbar('Please wait while we are verifying OTP...', 'info');

      try {
        await confirmationResult.current?.confirm(otp);
        showSnackbar('OTP Verified. Logging In :)', 'success');
      } catch (err: any) {
        showSnackbar(err?.message ?? 'Invalid OTP. Please try again... :(', 'error');
      } finally {
        setLoginState((prev) => ({ ...prev, loading: false }));
      }
    },
    [confirmationResult, setLoginState, showSnackbar],
  );

  const resetLoginState = React.useCallback(
    (): void => setLoginState(INITIAL_LOGIN_STATE),
    [setLoginState],
  );
  const { onAction, value } = useLoginForm({
    onSignInSubmit,
    onVerifyOTP,
    isOtpSent: loginState.isOtpSent,
    resetLoginState,
  });

  const fieldMap = React.useMemo(
    () =>
      getFieldMap({
        phoneInputDisabled: !!loginState.isOtpSent,
        otpInputDisabled: !loginState.isOtpSent,
      }),
    [loginState.isOtpSent],
  );

  const isSubmitDisabled =
    value.phone.length !== 10 || (loginState.isOtpSent && value.otp.length !== 6);
  return (
    <>
      <div id="sign-in-button" />
      <SnackBarOverlay
        open={snackbarState.open}
        severity={snackbarState.severity}
        message={snackbarState.message}
        onClose={hideSnackbar}
      />
      <Grid container gap={5} justifyContent="center">
        <Grid item container justifyContent="center" alignItems="center" gap={2} direction="row">
          <LoginOutlinedIcon fontSize="large" /> <Typography variant="h4">Login</Typography>
        </Grid>
        <Form
          layout={LAYOUT}
          fieldMap={fieldMap}
          onAction={onAction}
          value={value}
          config={{
            submit: {
              label: loginState.isOtpSent ? 'Verify OTP' : 'Send OTP',
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
