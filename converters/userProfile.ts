// lib
import _omit from 'lodash/omit';

// types
import { FirestoreDataConverter, GeoPoint } from 'firebase/firestore';
import { UserProfile } from 'types/profile';

export const profileConverter: FirestoreDataConverter<UserProfile> = {
  toFirestore: (profile: UserProfile) => ({
    ..._omit(profile, ['location']),
    location: new GeoPoint(profile?.location?.lat ?? 0, profile?.location?.lng ?? 0),
  }),
  fromFirestore: (snapshot, options): UserProfile => {
    const data = snapshot.data(options);
    return {
      ...data,
      location: {
        lat: data?.location?._lat,
        lng: data?.location?._long,
      },
    };
  },
};
