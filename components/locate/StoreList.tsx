import * as React from 'react';
import { Box, Typography } from '@mui/material';

export const StoreList = (): React.ReactElement => {
  const stores = [{ id: '1', location: 'PP' }];
  console.log(stores);
  return (
    <Box>
      <Typography>Stores</Typography>
    </Box>
  );
};
