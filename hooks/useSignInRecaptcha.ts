// lib
import * as React from 'react';
import { RecaptchaVerifier } from '@firebase/auth';

// constants
import { auth } from 'firebaseConfig';

export const useSignInRecaptcha = () => {
  React.useEffect(() => {
    (window as any).recaptchaVerifier = new RecaptchaVerifier(
      'sign-in-button',
      {
        size: 'invisible',
        callback: () => {},
      },
      auth,
    );
  }, []);
};
