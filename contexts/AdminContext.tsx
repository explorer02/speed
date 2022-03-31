// lib
import { createContext, useContext, useMemo } from 'react';

// types
import { useLoginInfo } from './LoginContext';

type AdminInfo = {
  isAdmin: boolean;
};

const AdminContext = createContext<AdminInfo>({
  isAdmin: false,
});

export const useAdminInfo = (): AdminInfo => useContext(AdminContext);

export const AdminProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const { isLoggedIn, user } = useLoginInfo();

  const value = useMemo(
    () => ({
      isAdmin: isLoggedIn && user?.id === '623a06a90905ebe88c2f690c',
    }),
    [isLoggedIn, user?.id],
  );
  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
