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
}): React.ReactElement => (
  <Snackbar open={open} autoHideDuration={5000} onClose={onClose}>
    <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
      {message}
    </Alert>
  </Snackbar>
);
