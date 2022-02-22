// lib
import * as React from 'react';

// components
import { Box, CircularProgress } from '@mui/material';

// hooks
import { useLoginInfo } from 'contexts/LoginContext';
import { useRouter } from 'next/router';

// constants
import { HOME_PATH, PROTECTED_PATHS } from 'constants/paths';
import { centerAll, expandXY } from 'styles/styleObjects';

export const ProtectRoute = ({ children }: { children: JSX.Element }): JSX.Element => {
  const { replace, pathname } = useRouter();
  const { isLoggedIn, loading } = useLoginInfo();

  const isProtectedPath = PROTECTED_PATHS.includes(pathname);
  const shouldRedirectToHome = !loading && !isLoggedIn && isProtectedPath;

  React.useEffect(() => {
    if (shouldRedirectToHome) replace(HOME_PATH);
  }, [replace, shouldRedirectToHome]);

  if (!isProtectedPath) return children;

  if (loading || shouldRedirectToHome)
    return (
      <Box {...expandXY} {...centerAll}>
        <CircularProgress size={100} />
      </Box>
    );

  return children;
};
