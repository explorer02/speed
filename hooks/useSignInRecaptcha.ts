// lib
import * as React from 'react';
import _noop from 'lodash/noop';

// firebaseConfig
import { auth } from 'firebaseConfig';

// helpers
import { isBrowserMode } from 'helper/localStorage';

// types
import { RecaptchaVerifier } from '@firebase/auth';

export const useSignInRecaptcha = (): RecaptchaVerifier | undefined => {
  const [state, setState] = React.useState<RecaptchaVerifier | undefined>();
  React.useEffect(() => {
    setState(
      isBrowserMode()
        ? new RecaptchaVerifier(
            'sign-in-button',
            {
              size: 'invisible',
              callback: _noop,
            },
            auth,
          )
        : undefined,
    );
  }, []);
  return state;
};
