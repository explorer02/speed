// lib
import * as React from 'react';

// components
import { Box, CircularProgress } from '@mui/material';

// hooks
import { useLoginInfo } from 'contexts/LoginContext';
import { useRouter } from 'next/router';

// constants
import { ADMIN_PATH, HOME_PATH, UNPROTECTED_PATHS } from 'constants/paths';
import { centerAll, expandXY } from 'styles/styleObjects';
import Error from 'next/error';
import { useAdminInfo } from 'contexts/AdminContext';

export const ProtectRoute = ({ children }: { children: JSX.Element }): JSX.Element => {
  const { replace, pathname } = useRouter();
  const { isLoggedIn } = useLoginInfo();
  const { isAdmin } = useAdminInfo();

  const isProtectedPath = !UNPROTECTED_PATHS.includes(pathname);
  const isAdminPath = pathname.startsWith(ADMIN_PATH);

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

  if (!isAdmin && isAdminPath) return <Error statusCode={404} />;

  return children;
};
