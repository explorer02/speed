// lib
import * as React from 'react';

// components
import { IconButton, Popover, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Box } from '@mui/system';

// hooks
import { useToggle } from 'hooks';

// constants
import { centerVertically } from 'styles/styleObjects';
import { ColumnRendererProps } from 'reusable/table';
import { Item } from 'types/store';

export const Description = ({ value }: ColumnRendererProps<Item>): JSX.Element => {
  const { value: isOpen, set: show, unset: hide } = useToggle();
  const ref = React.useRef<any>();

  return (
    <>
      <Box {...centerVertically} justifyContent="space-between">
        <Typography flexGrow={1} maxWidth="100%">
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
