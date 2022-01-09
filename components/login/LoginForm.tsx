// lib
import * as React from 'react';
import { signInWithPhoneNumber } from '@firebase/auth';

// components
import { Typography, Box, TextField, InputAdornment, Theme } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { SnackBarOverlay, useSnackbar } from 'reusable/snackbarOverlay';

// icons
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import DialpadOutlinedIcon from '@mui/icons-material/DialpadOutlined';

// hooks
import { useValidateInput, useSignInRecaptcha, useWindow, useSafeState } from 'hooks';

// firebaseConfig
import { auth } from 'firebaseConfig';

// constants
import { centerAll } from 'styles/styleObjects';

// types
import { ConfirmationResult } from 'firebase/auth';
import { SxProps } from '@mui/system';

const LOGIN_PHASES = {
  IDLE: 0,
  LOGIN_INITIALIZED: 1,
  OTP_SENT: 2,
  OTP_NOT_SENT: 3,
  OTP_VERIFICATION_INITIALIZED: 4,
  OTP_VERIFIED: 5,
  OPT_NOT_VERIFIED: 6,
} as const;

type LoginState = {
  loading: boolean;
  phase?: typeof LOGIN_PHASES[keyof typeof LOGIN_PHASES];
};

const INITIAL_LOGIN_STATE: LoginState = {
  loading: false,
  phase: LOGIN_PHASES.IDLE,
};

const LoginForm = ({ sx }: { sx?: SxProps<Theme> }): React.ReactElement => {
  const appVerifier = useSignInRecaptcha();
  const [confirmationResult, setConfirmationResult] = React.useState<ConfirmationResult>();

  const window = useWindow();
  const { state: snackbarState, showSnackbar, hideSnackbar } = useSnackbar();

  const { input: phoneNumber, handleInputChange: onPhoneNumberChange } = useValidateInput({
    maxLength: 10,
    regex: /\d/g,
  });

  const { input: otp, handleInputChange: onOTPChange } = useValidateInput({
    maxLength: 6,
    regex: /\d/g,
  });

  const [loginState, setLoginState] = useSafeState<LoginState>(INITIAL_LOGIN_STATE);

  const isValidPhoneNumber = phoneNumber.length === 10;
  const isValidOTP = otp.length === 6;

  const onSignInSubmit = React.useCallback(() => {
    setLoginState({
      loading: true,
      phase: LOGIN_PHASES.LOGIN_INITIALIZED,
    });
    showSnackbar('Please Wait...', 'info');

    signInWithPhoneNumber(auth, `+91${phoneNumber}`, appVerifier!).then(
      (_confirmationResult) => {
        setLoginState({
          loading: false,
          phase: LOGIN_PHASES.OTP_SENT,
        });
        showSnackbar('OTP Sent to your mobile number...', 'info');

        setConfirmationResult(_confirmationResult);
      },
      () => {
        setLoginState({
          loading: false,
          phase: LOGIN_PHASES.OTP_NOT_SENT,
        });
        showSnackbar('Server Error. Please try again in some time... :(', 'error');

        appVerifier?.render().then((widgetId) => {
          (window as any).grecaptcha?.reset(widgetId);
        });
      },
    );
  }, [appVerifier, phoneNumber, setLoginState, showSnackbar, window]);

  const onVerifyOTP = React.useCallback(() => {
    setLoginState({
      loading: true,
      phase: LOGIN_PHASES.OTP_VERIFICATION_INITIALIZED,
    });
    showSnackbar('Please wait while we are verifying OTP...', 'info');

    confirmationResult?.confirm(otp).then(
      () => {
        setLoginState({
          loading: false,
          phase: LOGIN_PHASES.OTP_VERIFIED,
        });
        showSnackbar('OTP Verified. Logging In :)', 'success');
      },
      () => {
        setLoginState({
          loading: false,
          phase: LOGIN_PHASES.OPT_NOT_VERIFIED,
        });
        showSnackbar('Invalid OTP. Please try again... :(', 'error');
      },
    );
  }, [confirmationResult, otp, setLoginState, showSnackbar]);

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
        <TextField
          label="Phone Number"
          color="primary"
          fullWidth
          required
          placeholder="1234567890"
          helperText="Please enter your phone number here..."
          type="tel"
          value={phoneNumber}
          onChange={onPhoneNumberChange}
          disabled={
            loginState.phase === LOGIN_PHASES.OTP_SENT ||
            loginState.phase === LOGIN_PHASES.OTP_VERIFICATION_INITIALIZED
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocalPhoneOutlinedIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="OTP"
          color="primary"
          fullWidth
          required
          placeholder="XXXXXX"
          helperText="Please enter the otp sent to your phone number..."
          type="text"
          value={otp}
          onChange={onOTPChange}
          disabled={loginState.phase !== LOGIN_PHASES.OTP_SENT}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DialpadOutlinedIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          variant="contained"
          fullWidth
          size="large"
          sx={{ padding: 2 }}
          startIcon={<DoneAllOutlinedIcon />}
          loading={loginState.loading}
          loadingIndicator="Please wait..."
          onClick={loginState.phase === LOGIN_PHASES.OTP_SENT ? onVerifyOTP : onSignInSubmit}
          disabled={
            loginState.loading || loginState.phase === LOGIN_PHASES.OTP_SENT
              ? !isValidOTP
              : !isValidPhoneNumber
          }
        >
          {loginState.phase === LOGIN_PHASES.OTP_SENT ? 'Verify OTP' : 'Send OTP'}
        </LoadingButton>
      </Box>
    </>
  );
};

const MemoizedLoginForm = React.memo(LoginForm);
MemoizedLoginForm.displayName = 'MemoizedLoginForm';

export { MemoizedLoginForm as LoginForm };
