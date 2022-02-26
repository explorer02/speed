// lib
import * as React from 'react';

// components
import { Box } from '@mui/material';
import { ProfileForm } from 'components/profile/ProfileForm';

// constants
import { centerHorizontally } from 'styles/styleObjects';

// types
import { NextPage } from 'next';

const Profile: NextPage = () => (
  <Box width="100%" {...centerHorizontally}>
    <ProfileForm sx={{ width: 700, maxWidth: '90%' }} />
  </Box>
);

export default Profile;
