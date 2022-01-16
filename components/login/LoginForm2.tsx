// lib
import * as React from 'react';
import { signInWithPhoneNumber, RecaptchaVerifier } from '@firebase/auth';

// components
import { Typography, Box, InputAdornment, Theme } from '@mui/material';
import { SnackBarOverlay, useSnackbar } from 'reusable/snackbarOverlay';
import { FormControlNumberInput } from 'reusable/form/components';

// icons
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import DialpadOutlinedIcon from '@mui/icons-material/DialpadOutlined';

// hooks
import { useSignInRecaptcha, useWindow, useSafeState } from 'hooks';
import { useLoginForm } from './useLoginForm';

// firebaseConfig
import { auth } from 'firebaseConfig';

// constants
import { centerAll } from 'styles/styleObjects';
import { LAYOUT } from './layout';

// types
import { ConfirmationResult } from 'firebase/auth';
import { SxProps } from '@mui/system';
import { FIELDS } from './fields';
import { FieldMap, Form } from 'reusable/form';

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

const LoginForm = ({ sx }: { sx?: SxProps<Theme> }): React.ReactElement => {
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

  const { onAction, value } = useLoginForm({
    onSignInSubmit,
    onVerifyOTP,
    isOtpSent: loginState.isOtpSent,
  });

  // TODO: extract this to function
  const fieldMap: FieldMap = React.useMemo(
    () => ({
      [FIELDS.PHONE]: {
        Component: FormControlNumberInput,
        componentProps: {
          label: 'Phone Number',
          disabled: loginState.isOtpSent,
          helperText: 'Please enter your phone number here...',
          placeholder: '1234567890',
          startAdornment: (
            <InputAdornment position="start">
              <LocalPhoneOutlinedIcon color="primary" />
            </InputAdornment>
          ),
        },
      },
      [FIELDS.OTP]: {
        Component: FormControlNumberInput,
        componentProps: {
          label: 'OTP',
          helperText: 'Please enter the otp sent to your phone number...',
          disabled: !loginState.isOtpSent,
          placeholder: 'XXXXXX',
          startAdornment: (
            <InputAdornment position="start">
              <DialpadOutlinedIcon color="primary" />
            </InputAdornment>
          ),
        },
      },
    }),
    [loginState.isOtpSent],
  );
  return (
    <>
      <div id="sign-in-button" />
      <SnackBarOverlay
        open={snackbarState.open}
        severity={snackbarState.severity}
        message={snackbarState.message}
        onClose={hideSnackbar}
      />
      <Box {...centerAll} flexDirection="column" gap="40px" sx={sx}>
        <Typography variant="h4" component="div" {...centerAll} gap="16px" mb={4}>
          <LoginOutlinedIcon fontSize="large" /> Login
        </Typography>
        <Form
          layout={LAYOUT}
          fieldMap={fieldMap}
          onAction={onAction}
          value={value}
          config={{
            submit: {
              label: loginState.isOtpSent ? 'Verify OTP' : 'Send OTP',
              disabled:
                value.phone.length !== 10 || (loginState.isOtpSent && value.otp.length !== 6),
            },
          }}
        />
      </Box>
    </>
  );
};

const MemoizedLoginForm = React.memo(LoginForm);
MemoizedLoginForm.displayName = 'MemoizedLoginForm';

export { MemoizedLoginForm as LoginForm };
