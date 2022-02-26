// lib
import * as React from 'react';

// components
import { Box } from '@mui/material';
import { LoginForm } from 'components/login/LoginForm';

// hooks
import { useLoginInfo } from 'contexts/LoginContext';

// constants
import { centerAll } from 'styles/styleObjects';

// types
import { NextPage } from 'next';

const Home: NextPage = () => {
  const { isLoggedIn } = useLoginInfo();
  return isLoggedIn ? (
    <Box>Home</Box>
  ) : (
    <Box width="100%" pt={8} {...centerAll}>
      <Box width={450} maxWidth="90%">
        <LoginForm />
      </Box>
    </Box>
  );
};

export default Home;
