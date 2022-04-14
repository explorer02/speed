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
  <Snackbar
    open={open}
    autoHideDuration={5000}
    onClose={onClose}
    sx={{ maxWidth: '100%' }}
    message={message}
  >
    <Alert
      onClose={onClose}
      severity={severity}
      variant="filled"
      sx={{
        width: '100%',
        paddingY: 1,
        paddingX: 2,
        borderRadius: '8px',
      }}
    >
      {message}
    </Alert>
  </Snackbar>
);
