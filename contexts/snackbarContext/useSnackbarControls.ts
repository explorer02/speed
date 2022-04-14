// lib
import { useCallback } from 'react';

// hooks
import { useSafeState } from 'hooks/useSafeState';

// types
import { AlertColor } from '@mui/material';

export type SnackbarState = {
  open: boolean;
  severity: AlertColor;
  message: string;
};

const INITIAL_STATE: SnackbarState = { open: false, severity: 'info', message: '' };

type UseSnackbarControls = () => {
  state: SnackbarState;
  showSnackbar: (message: string, severity: AlertColor) => void;
  hideSnackbar: () => void;
};

export const useSnackbarControls: UseSnackbarControls = () => {
  const [state, setState] = useSafeState<SnackbarState>(INITIAL_STATE);

  const showSnackbar = useCallback(
    (message: string, severity: AlertColor): void => {
      setState((prev) => ({ ...prev, severity, message, open: true }));
    },
    [setState],
  );
  const hideSnackbar = useCallback(() => {
    setState((prev) => ({ ...prev, open: false }));
  }, [setState]);

  return {
    state,
    showSnackbar,
    hideSnackbar,
  };
};
