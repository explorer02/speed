// lib
import * as React from 'react';

// components
import { Typography, Box } from '@mui/material';
import { LightModeButton } from './LightModeButton';

// constants
import { centerVertically, expandXY } from 'styles/styleObjects';

const Header = ({ title }: { title: string }): JSX.Element => (
  <Box
    {...expandXY}
    {...centerVertically}
    justifyContent="space-between"
    id="header"
    pl={4}
    pr={2}
    pt={2}
  >
    <Typography variant="h5" fontWeight={600}>
      {title}
    </Typography>
    <LightModeButton />
  </Box>
);

const MemoizedHeader = React.memo(Header);
export { MemoizedHeader as Header };
