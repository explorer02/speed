// lib
import * as React from 'react';

// components
import { Box, CircularProgress } from '@mui/material';

// hooks
import { useLoginInfo } from 'contexts/LoginContext';
import { useRouter } from 'next/router';

// constants
import { HOME_PATH, UNPROTECTED_PATHS } from 'constants/paths';
import { centerAll, expandXY } from 'styles/styleObjects';

export const ProtectRoute = ({ children }: { children: JSX.Element }): JSX.Element => {
  const { replace, pathname } = useRouter();
  const { isLoggedIn } = useLoginInfo();

  const isProtectedPath = !UNPROTECTED_PATHS.includes(pathname);

  const shouldRedirectToHome = !isLoggedIn && isProtectedPath && pathname !== HOME_PATH;

  React.useEffect(() => {
    if (shouldRedirectToHome) replace(HOME_PATH);
  }, [replace, shouldRedirectToHome]);

  if (!isProtectedPath) return children;

  if (shouldRedirectToHome)
    return (
      <Box {...expandXY} {...centerAll}>
        <CircularProgress size={100} />
      </Box>
    );

  return children;
};
