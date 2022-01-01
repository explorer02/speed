// lib
import * as React from 'react';

// components
import { Box } from '@mui/material';
import { Login } from 'components/Login';

// hooks
import { useLoginInfo } from 'contexts/LoginContext';

// types
import { NextPage } from 'next';

const Home: NextPage = () => {
  const { isLoggedIn } = useLoginInfo();
  return isLoggedIn ? <Box>Home</Box> : <Login />;
};

export default Home;
