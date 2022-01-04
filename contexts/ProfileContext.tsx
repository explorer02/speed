// lib
import * as React from 'react';
import _noop from 'lodash/noop';

// helper
import { getUserProfileDocRef } from 'helper/docReference';

// types
import { UserProfile } from 'types/profile';
import { useLoginInfo } from './LoginContext';
import { onSnapshot } from 'firebase/firestore';

type ProfileInfo = {
  loading?: boolean;
  profile?: UserProfile;
};

export const ProfileContext = React.createContext<ProfileInfo>({ loading: false });

export const useProfileInfo = (): ProfileInfo => React.useContext(ProfileContext);

const INITIAL_PROFILE_STATE: ProfileInfo = { loading: true };

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  const [profileState, setProfileState] = React.useState<ProfileInfo>(INITIAL_PROFILE_STATE);
  const { isLoggedIn, user } = useLoginInfo();

  React.useEffect(() => {
    let unSubscribe = _noop;
    if (isLoggedIn && user) {
      const docRef = getUserProfileDocRef(user.phoneNumber!);
      unSubscribe = onSnapshot(docRef, (doc) => {
        if (doc.exists()) setProfileState({ loading: false, profile: doc.data() });
        else setProfileState({ loading: false });
      });
    }
    return unSubscribe;
  }, [isLoggedIn, user]);

  return <ProfileContext.Provider value={profileState}>{children}</ProfileContext.Provider>;
};
