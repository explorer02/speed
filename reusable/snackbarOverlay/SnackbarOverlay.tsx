// lib
import * as React from 'react';

// components
import { Snackbar, Alert, AlertProps } from '@mui/material';

export const SnackBarOverlay = ({
  open,
  onClose,
  message,
  severity = 'success',
}: {
  open: boolean;
  onClose: () => void;
  message: string;
  severity?: AlertProps['severity'];
}): JSX.Element => (
  <Snackbar open={open} autoHideDuration={5000} onClose={onClose} sx={{ maxWidth: '100%' }}>
    <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
      {message}
    </Alert>
  </Snackbar>
);
