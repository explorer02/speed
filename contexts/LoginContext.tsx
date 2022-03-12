// lib
import * as React from 'react';

// firebaseConfig
import { auth } from 'firebaseConfig';

type LoginInfo = {
  loading?: boolean;
  isLoggedIn: boolean;
  user: { phoneNumber: string } | null;
};

export const LoginContext = React.createContext<LoginInfo>({ isLoggedIn: false, user: null });

export const useLoginInfo = (): LoginInfo => React.useContext(LoginContext);

const INITIAL_LOGIN_STATE: LoginInfo = { isLoggedIn: false, user: null, loading: true };

export const LoginProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [loginState, setLoginState] = React.useState<LoginInfo>(INITIAL_LOGIN_STATE);
  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoginState({ isLoggedIn: true, user: user as any, loading: false });
      } else setLoginState({ ...INITIAL_LOGIN_STATE, loading: false });
    });
  }, []);

  return <LoginContext.Provider value={loginState}>{children}</LoginContext.Provider>;
};
