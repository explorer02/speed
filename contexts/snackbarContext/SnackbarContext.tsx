// lib
import { createContext, useContext, useMemo } from 'react';
import _noop from 'lodash/noop';

// component
import { SnackBarOverlay } from './SnackbarOverlay';

// hooks
import { useSnackbarControls } from './useSnackbarControls';

type SnackbarUtils = {
  onSuccess: (msg: string) => void;
  onFailure: (msg: string) => void;
  onWarning: (msg: string) => void;
  onInfo: (msg: string) => void;
};

const SnackbarContext = createContext<SnackbarUtils>({
  onSuccess: _noop,
  onFailure: _noop,
  onWarning: _noop,
  onInfo: _noop,
});

export const useSnackbar = (): SnackbarUtils => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const { state, hideSnackbar, showSnackbar } = useSnackbarControls();

  const contextValue: SnackbarUtils = useMemo(
    () => ({
      onSuccess: (msg) => showSnackbar(msg, 'success'),
      onWarning: (msg) => showSnackbar(msg, 'warning'),
      onFailure: (msg) => showSnackbar(msg, 'error'),
      onInfo: (msg) => showSnackbar(msg, 'info'),
    }),
    [showSnackbar],
  );

  return (
    <SnackbarContext.Provider value={contextValue}>
      <SnackBarOverlay
        message={state.message}
        open={state.open}
        severity={state.severity}
        onClose={hideSnackbar}
      />
      {children}
    </SnackbarContext.Provider>
  );
};
