// lib
import * as React from 'react';

// components
import { Box, Typography } from '@mui/material';

export const FormControlGroup = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): React.ReactElement => (
  <Box width="100%">
    <Typography color="primary" variant="body1" mb={2}>
      {title}
    </Typography>
    {children}
  </Box>
);
