// lib
import * as React from 'react';

// components
import { Box } from '@mui/material';
import { ProfileForm } from 'components/profile/ProfileForm';

// constants
import { centerHorizontally } from 'styles/styleObjects';

// types
import { NextPage } from 'next';
import { PageLayout, SLOT_NAMES } from 'containers/PageLayout';
import { Header } from 'components/app/header';
import { Sidebar } from 'components/app/sidebar';

const Profile: NextPage = () => (
  <PageLayout>
    <PageLayout.Slot name={SLOT_NAMES.HEADER}>
      <Header title="Profile" />
    </PageLayout.Slot>
    <PageLayout.Slot name={SLOT_NAMES.MAIN}>
      <ProfileForm sx={{ width: 700, maxWidth: '90%' }} />
    </PageLayout.Slot>
    <PageLayout.Slot name={SLOT_NAMES.SIDEBAR}>
      <Sidebar />
    </PageLayout.Slot>
  </PageLayout>
);

export default Profile;
