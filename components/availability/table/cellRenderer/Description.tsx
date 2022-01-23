// lib
import * as React from 'react';
import { GridRenderCellParams } from '@mui/x-data-grid';

// components
import { IconButton, Popover, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Box } from '@mui/system';

// hooks
import { useToggle } from 'hooks';

// constants
import { centerVertically } from 'styles/styleObjects';

export const Description = ({ value }: GridRenderCellParams): React.ReactElement => {
  const { value: isOpen, set: show, unset: hide } = useToggle();
  const ref = React.useRef<any>();

  return (
    <>
      <Box width="100%" {...centerVertically} justifyContent="space-between">
        <Typography noWrap flexGrow={1}>
          {value}
        </Typography>
        <Box flexShrink={0}>
          <IconButton onClick={isOpen ? hide : show} ref={ref}>
            <InfoIcon />
          </IconButton>
        </Box>
      </Box>
      <Popover
        id="description-popover"
        open={isOpen}
        anchorEl={ref.current}
        onClose={hide}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography maxWidth={400} p={2}>
          {value}
        </Typography>
      </Popover>
    </>
  );
};
