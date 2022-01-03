// lib
import * as React from 'react';

// types
import { AlertProps } from '@mui/material';

type State = { open: boolean; severity: AlertProps['severity']; message: string };
const INITIAL_STATE: State = { open: false, severity: 'info', message: '' };

export const useSnackbar = (): {
  state: State;
  showSnackbar: (message: string, isError?: boolean) => void;
  hideSnackbar: () => void;
} => {
  const [state, setState] = React.useState<State>(INITIAL_STATE);

  const showSnackbar = React.useCallback((message: string, isError: boolean = false): void => {
    setState({ severity: isError ? 'error' : 'success', message, open: true });
  }, []);
  const hideSnackbar = React.useCallback(() => {
    setState((prev) => ({ ...prev, open: false }));
  }, []);

  return { state, showSnackbar, hideSnackbar };
};
