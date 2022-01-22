import * as React from 'react';
import { useLatest } from 'react-use';
import { FormAction, FORM_ACTIONS } from 'reusable/form';

type State = {
  phone: string;
  otp: string;
};
const INITIAL_VALUE: State = {
  phone: '',
  otp: '',
};

type UseLoginForm = (props: {
  onSignInSubmit: (phone: string) => Promise<void>;
  onVerifyOTP: (phone: string) => Promise<void>;
  isOtpSent?: boolean;
  resetLoginState: () => void;
}) => {
  onAction: (action: FormAction) => void;
  value: State;
};

export const useLoginForm: UseLoginForm = ({
  onSignInSubmit,
  onVerifyOTP,
  isOtpSent,
  resetLoginState,
}) => {
  const [state, setState] = React.useState(INITIAL_VALUE);
  const stateRef = useLatest(state);

  const handleAction = React.useCallback(
    (action: FormAction) => {
      switch (action.type) {
        case FORM_ACTIONS.ON_CHANGE:
          setState((prev) => ({ ...prev, [action.payload.id]: action.payload.value }));
          break;

        case FORM_ACTIONS.ON_SUBMIT:
          if (!isOtpSent) {
            onSignInSubmit(stateRef.current.phone);
          } else {
            onVerifyOTP(stateRef.current.otp);
          }
          break;

        case FORM_ACTIONS.ON_RESET:
          setState(INITIAL_VALUE);
          resetLoginState();
          break;

        default:
          break;
      }
    },
    [isOtpSent, onSignInSubmit, onVerifyOTP, resetLoginState, stateRef],
  );

  return { onAction: handleAction, value: state };
};
