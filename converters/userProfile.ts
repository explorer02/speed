// lib
import _omit from 'lodash/omit';

// types
import { FirestoreDataConverter, GeoPoint } from 'firebase/firestore';
import { UserProfile } from 'types/profile';

export const profileConverter: FirestoreDataConverter<UserProfile> = {
  toFirestore: (profile: UserProfile) => ({
    ..._omit(profile, ['docId', 'location']),
    location: new GeoPoint(profile?.location?.latitude ?? 0, profile?.location?.longitude ?? 0),
  }),
  fromFirestore: (snapshot, options): UserProfile => {
    const data = snapshot.data(options);
    return {
      ...data,
      location: {
        latitude: data?.location?._lat,
        longitude: data?.location?._long,
      },
      docId: snapshot.id,
    };
  },
};
