// lib
import * as React from 'react';

// components
import { Box, CircularProgress, Dialog, DialogContent, DialogContentText } from '@mui/material';
import { centerVertically } from 'styles/styleObjects';

export const LoadingModal = ({
  open,
  loadingText,
}: {
  open: boolean;
  loadingText: string;
}): React.ReactElement => (
  <Dialog open={open} keepMounted aria-describedby="alert-dialog-slide-description">
    <DialogContent>
      <Box m={2} {...centerVertically}>
        <CircularProgress size={50} />
        <DialogContentText id="alert-dialog-slide-description" mx={4} my={2}>
          {loadingText}
        </DialogContentText>
      </Box>
    </DialogContent>
  </Dialog>
);
