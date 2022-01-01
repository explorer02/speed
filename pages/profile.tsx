// lib
import * as React from 'react';

// components
import { Box } from '@mui/material';
import { ProfileForm } from 'components/profile/ProfileForm';

// styles
import { centerVertically } from 'styles/styleObjects';

// types
import { NextPage } from 'next';

const Profile: NextPage = () => (
  <Box minHeight="50%" width="40%" {...centerVertically}>
    <ProfileForm />
  </Box>
);

export default Profile;
