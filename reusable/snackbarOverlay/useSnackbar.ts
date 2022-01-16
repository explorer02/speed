// lib
import * as React from 'react';

// hooks
import { useSafeState } from 'hooks';

// types
import { AlertColor } from '@mui/material';

export type SnackbarState = { open: boolean; severity: AlertColor; message: string };

const INITIAL_STATE: SnackbarState = { open: false, severity: 'info', message: '' };

type UseSnackbar = () => {
  state: SnackbarState;
  showSnackbar: (message: string, severity: AlertColor) => void;
  hideSnackbar: () => void;
};

export const useSnackbar: UseSnackbar = () => {
  const [state, setState] = useSafeState<SnackbarState>(INITIAL_STATE);

  const showSnackbar = React.useCallback(
    (message: string, severity: AlertColor): void => {
      setState({ severity, message, open: true });
    },
    [setState],
  );
  const hideSnackbar = React.useCallback(() => {
    setState((prev) => ({ ...prev, open: false }));
  }, [setState]);

  return { state, showSnackbar, hideSnackbar };
};
