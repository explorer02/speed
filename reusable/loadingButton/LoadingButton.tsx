// lib
import { forwardRef } from 'react';

// components
import { ButtonProps, Button, CircularProgress } from '@mui/material';

type Props = ButtonProps & {
  loading: boolean;
  loaderColor?: string;
};

export const LoadingButton = forwardRef(
  ({ loading, onClick, sx, children, variant, ...rest }: Props, ref?: any): JSX.Element => (
    <Button
      ref={ref}
      onClick={loading ? undefined : onClick}
      sx={{ padding: 1, ...sx }}
      {...rest}
      variant={variant}
    >
      {loading ? (
        <CircularProgress size={30} sx={{ color: variant === 'outlined' ? 'primary' : 'white' }} />
      ) : (
        children
      )}
    </Button>
  ),
);
