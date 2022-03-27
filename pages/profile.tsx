// lib
import * as React from 'react';

// components
import { ProfileForm } from 'components/profile/ProfileForm';
import { CommonPageLayout, SLOT_NAMES } from 'containers/CommonPageLayout';

// types
import { NextPage } from 'next';

const Profile: NextPage = () => (
  <CommonPageLayout title="Profile">
    <CommonPageLayout.Slot name={SLOT_NAMES.MAIN}>
      <ProfileForm sx={{ width: 700, maxWidth: '90%' }} />
    </CommonPageLayout.Slot>
  </CommonPageLayout>
);

export default Profile;
