// lib
import { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import { User } from 'realm-web';
import _noop from 'lodash/noop';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// config
import { RealmApp } from 'config/realm';

// types
import { UserProfile } from 'types/profile';

type LoginInfo = {
  isLoggedIn: boolean;
  user: User<any, UserProfile> | null;
  setLoginState: (params: Pick<LoginInfo, 'isLoggedIn' | 'user'>) => void;
  logout: () => void;
};

const LoginContext = createContext<LoginInfo>({
  isLoggedIn: false,
  user: null,
  setLoginState: _noop,
  logout: _noop,
});

export const useLoginInfo = (): LoginInfo => useContext(LoginContext);

export const LoginProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [loginState, setLoginState] = useState<Pick<LoginInfo, 'user' | 'isLoggedIn'>>({
    user: RealmApp.currentUser,
    isLoggedIn: !!RealmApp.currentUser,
  });
  // TODO: fetch profile here

  const logout = useCallback(async () => {
    await RealmApp.currentUser?.logOut().then(() => {
      setLoginState({ user: null, isLoggedIn: false });
    });
  }, []);

  const value = useMemo(() => ({ ...loginState, setLoginState, logout }), [loginState, logout]);
  const client = useMemo(
    () =>
      new ApolloClient({
        uri: process.env.NEXT_PUBLIC_DB_URL,
        headers: {
          Authorization: `Bearer ${loginState.user?.accessToken}`,
        },
        cache: new InMemoryCache(),
      }),
    [loginState.user?.accessToken],
  );

  useEffect(() => {
    RealmApp.currentUser?.refreshAccessToken();
    const id = setInterval(() => {
      RealmApp.currentUser?.refreshAccessToken();
    }, 25 * 60 * 1000);
    return clearInterval(id);
  }, []);

  return (
    <ApolloProvider client={client}>
      <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
    </ApolloProvider>
  );
};
