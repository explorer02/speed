// lib
import { memo } from 'react';

// components
import { Typography, Box, NoSsr } from '@mui/material';
import { LightModeButton } from './LightModeButton';
import { Login } from '../sidebar/components/Login';

// constants
import { centerVertically } from 'styles/styleObjects';

const Header = ({ title }: { title: string }): JSX.Element => (
  <Box {...centerVertically} justifyContent="space-between" id="header" px={4} pt={2}>
    <Typography variant="h6">{title}</Typography>
    <Box>
      <NoSsr>
        <Login sx={{ mr: 2 }} />
        <LightModeButton />
      </NoSsr>
    </Box>
  </Box>
);

const MemoizedHeader = memo(Header);
export { MemoizedHeader as Header };
