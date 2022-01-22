// lib
import * as React from 'react';

// components
import { Box } from '@mui/material';
import { LoginForm } from 'components/login/LoginForm';

// hooks
import { useLoginInfo } from 'contexts/LoginContext';

// types
import { NextPage } from 'next';
import { centerAll } from 'styles/styleObjects';

const Home: NextPage = () => {
  const { isLoggedIn } = useLoginInfo();
  return isLoggedIn ? (
    <Box>Home</Box>
  ) : (
    <Box width="100%" pt={8} {...centerAll}>
      <Box width="40%">
        <LoginForm />
      </Box>
    </Box>
  );
};

export default Home;
