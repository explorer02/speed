// lib
import * as React from 'react';
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
  setLoginState: (params: Omit<LoginInfo, 'setLoginState'>) => void;
};

const LoginContext = React.createContext<LoginInfo>({
  isLoggedIn: false,
  user: null,
  setLoginState: _noop,
});

export const useLoginInfo = (): LoginInfo => React.useContext(LoginContext);

export const LoginProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [loginState, setLoginState] = React.useState<Omit<LoginInfo, 'setLoginState'>>({
    user: RealmApp.currentUser,
    isLoggedIn: !!RealmApp.currentUser,
  });
  // TODO: fetch profile here

  const value = React.useMemo(() => ({ ...loginState, setLoginState }), [loginState]);
  const client = React.useMemo(
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

  React.useEffect(() => {
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
