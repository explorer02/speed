// lib
import * as React from 'react';
import _noop from 'lodash/noop';

// hooks
import { useSafeState } from 'hooks/useSafeState';

// types
import { AlertColor } from '@mui/material';

export type SnackbarState = {
  open: boolean;
  severity: AlertColor;
  message: string;
  onClose: () => void;
};

const INITIAL_STATE: SnackbarState = { open: false, severity: 'info', message: '', onClose: _noop };

type UseSnackbar = () => {
  state: SnackbarState;
  showSnackbar: (message: string, severity: AlertColor) => void;
  hideSnackbar: () => void;
};

export const useSnackbar: UseSnackbar = () => {
  const [state, setState] = useSafeState<SnackbarState>(INITIAL_STATE);

  const showSnackbar = React.useCallback(
    (message: string, severity: AlertColor): void => {
      setState((prev) => ({ ...prev, severity, message, open: true }));
    },
    [setState],
  );
  const hideSnackbar = React.useCallback(() => {
    setState((prev) => ({ ...prev, open: false }));
  }, [setState]);

  return {
    state: React.useMemo(() => ({ ...state, onClose: hideSnackbar }), [hideSnackbar, state]),
    showSnackbar,
    hideSnackbar,
  };
};
