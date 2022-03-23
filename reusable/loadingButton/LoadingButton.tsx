// lib
import * as React from 'react';

// components
import { ButtonProps, Button, CircularProgress } from '@mui/material';

type Props = ButtonProps & {
  loading: boolean;
};

export const LoadingButton = React.forwardRef(
  ({ loading, onClick, sx, children, ...rest }: Props, ref?: any): JSX.Element => (
    <Button ref={ref} onClick={loading ? undefined : onClick} sx={{ padding: 1, ...sx }} {...rest}>
      {loading ? <CircularProgress size={30} sx={{ color: 'white' }} /> : children}
    </Button>
  ),
);
