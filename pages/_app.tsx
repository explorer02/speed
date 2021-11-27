import * as React from 'react';

// styles
import 'styles/globals.css';
import 'fontsource-roboto';

// components
import { Layout } from 'components/Layout';

// types
import { AppProps } from 'next/app';
import { NextPage } from 'next';
import { PhoneContext } from 'contexts/UserContext';
import { getFromLocalStorage, setToLocalStorage } from 'helper/localStorage';
import { HOME_PATH, PROFILE_PATH, PROTECTED_PATHS } from 'constants/paths';
import { useRouter } from 'next/router';

const PHONE_KEY = 'phone';
const EXPIRES_KEY = 'expires_at';

function MyApp({ Component, pageProps }: AppProps): NextPage {
  const { replace, pathname } = useRouter();

  const [phone, setPhone] = React.useState(() => {
    const value: string = getFromLocalStorage(PHONE_KEY);
    const expire = Number(getFromLocalStorage(EXPIRES_KEY));
    return expire < Date.now() ? undefined : value;
  });

  React.useEffect(() => {
    if (phone) {
      setToLocalStorage(PHONE_KEY, phone);
      setToLocalStorage(EXPIRES_KEY, Date.now() + 60 * 60 * 1000);

      setTimeout(() => {
        replace(PROFILE_PATH);
      }, 500);
    }
  }, [phone]);

  const contextValue = React.useMemo(
    () => ({
      phone,
      setPhone,
    }),
    [phone],
  );

  const isLoggedIn = !!phone;
  const isProtectedPath = PROTECTED_PATHS.includes(pathname);
  const shouldRedirectToHome = !isLoggedIn && isProtectedPath;

  React.useLayoutEffect(() => {
    if (shouldRedirectToHome) replace(HOME_PATH);
  }, [shouldRedirectToHome]);

  return (
    <PhoneContext.Provider value={contextValue}>
      <Layout>{!shouldRedirectToHome && <Component {...pageProps} />}</Layout>
    </PhoneContext.Provider>
  ) as unknown as NextPage;
}
export default MyApp;
