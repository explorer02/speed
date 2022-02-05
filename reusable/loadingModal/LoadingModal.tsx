// lib
import * as React from 'react';

// components
import { Box, CircularProgress, Dialog, DialogContent, DialogContentText } from '@mui/material';

// constants
import { centerVertically } from 'styles/styleObjects';

export const LoadingModal = ({
  open,
  loadingText,
}: {
  open: boolean;
  loadingText: string;
}): JSX.Element => (
  <Dialog open={open} keepMounted aria-describedby="alert-dialog-slide-description">
    <DialogContent>
      <Box m={1} {...centerVertically}>
        <CircularProgress size={50} />
        <DialogContentText id="alert-dialog-slide-description" mx={2} my={1}>
          {loadingText}
        </DialogContentText>
      </Box>
    </DialogContent>
  </Dialog>
);
