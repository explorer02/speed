//lib
import * as React from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "@firebase/auth";

// components
import { Typography, Box, TextField, InputAdornment } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

//icons
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import DialpadOutlinedIcon from "@mui/icons-material/DialpadOutlined";

//hooks
import { useRouter } from "next/dist/client/router";

//constants
import { centerAll } from "utils/commonProps";
import { auth } from "firebaseConfig";
import { AVAILABILITY_PATH } from "constants/paths";

const LOGIN_PHASES = {
  IDLE: 0,
  FAILED: 1,
  OTP_SENT: 2,
  SUCCESS: 3,
};

type LoginState = {
  loading: boolean;
  phase?: number;
  message?: string;
};
const INITIAL_LOGIN_STATE: LoginState = {
  loading: false,
  phase: LOGIN_PHASES.IDLE,
  message: "",
};

export const Login = () => {
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [otp, setOTP] = React.useState<string>("");

  const [loginState, setLoginState] =
    React.useState<LoginState>(INITIAL_LOGIN_STATE);
  const { replace } = useRouter();

  const handlePhoneNumberChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const number = ev.target.value;
      const regexResult = number.match(/\d/g);
      if (
        number === "" ||
        (regexResult?.length === number.length && number.length <= 10)
      )
        setPhoneNumber(number);
    },
    []
  );
  const handleOTPChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const code = ev.target.value;
      const regexResult = code.match(/\d/g);
      if (
        code === "" ||
        (regexResult?.length === code.length && code.length <= 6)
      )
        setOTP(code);
    },
    []
  );
  const isValidPhoneNumber = phoneNumber.match(/\d/g)?.length === 10;
  const isValidOTP = otp.match(/\d/g)?.length === 6;

  const onSignInSubmit = () => {
    setLoginState({ loading: true });
    const appVerifier = (window as any)?.["recaptchaVerifier"];
    signInWithPhoneNumber(auth, "+91" + phoneNumber, appVerifier).then(
      (confirmationResult) => {
        setLoginState({
          loading: false,
          phase: LOGIN_PHASES.OTP_SENT,
          message: "OTP Sent to your mobile number...",
        });
        (window as any).confirmationResult = confirmationResult;
      },
      () => {
        setLoginState({
          loading: false,
          phase: LOGIN_PHASES.FAILED,
          message: "Server Error. Please try again in some time... :(",
        });
        (window as any)?.recaptchaVerifier
          .render()
          .then(function (widgetId: string) {
            (window as any).grecaptcha?.reset(widgetId);
          });
      }
    );
  };

  const onVerifyOTP = () => {
    const confirmationResult = (window as any)["confirmationResult"];
    setLoginState({ loading: true });
    confirmationResult.confirm(otp).then(
      () => {
        setLoginState({
          loading: false,
          phase: LOGIN_PHASES.SUCCESS,
          message: "Login Verified. Logging In :)",
        });
        setTimeout(() => {
          replace(AVAILABILITY_PATH);
        }, 500);
      },
      () => {
        setLoginState({
          loading: false,
          phase: LOGIN_PHASES.FAILED,
          message: "Unable to verify OTP. Please try again Later... :(",
        });
      }
    );
  };

  React.useEffect(() => {
    (window as any).recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: () => {},
      },
      auth
    );
  }, []);

  return (
    <Box height="100%" {...centerAll}>
      <div id="sign-in-button" />
      <Box
        minHeight="50%"
        minWidth="30%"
        maxWidth="50%"
        {...centerAll}
        flexDirection="column"
        gap="40px"
      >
        <Typography
          variant="h4"
          component="div"
          {...centerAll}
          gap="16px"
          mb={4}
        >
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
          onChange={handlePhoneNumberChange}
          disabled={loginState.phase === LOGIN_PHASES.OTP_SENT}
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
          onChange={handleOTPChange}
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
          onClick={
            loginState.phase === LOGIN_PHASES.OTP_SENT
              ? onVerifyOTP
              : onSignInSubmit
          }
          disabled={
            loginState.loading || loginState.phase === LOGIN_PHASES.OTP_SENT
              ? !isValidOTP
              : !isValidPhoneNumber
          }
        >
          {loginState.phase === LOGIN_PHASES.OTP_SENT
            ? "Verify OTP"
            : "Send OTP"}
        </LoadingButton>
        <Typography>{loginState.message}</Typography>
      </Box>
    </Box>
  );
};
