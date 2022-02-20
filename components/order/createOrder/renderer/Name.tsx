// lib
import * as React from 'react';

// components
import { Box, IconButton, Popover, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

// hooks
import { useToggle } from 'hooks';

// constants
import { centerVertically } from 'styles/styleObjects';

// types
import { ColumnRendererProps } from 'reusable/table';
import { Item } from 'types/store';

export const Name = ({ value, entity: item }: ColumnRendererProps<Item>): JSX.Element => {
  const { value: isOpen, set: show, unset: hide } = useToggle();
  const ref = React.useRef<any>();

  return (
    <>
      <Box {...centerVertically} gap={3}>
        <Typography maxWidth="100%">{value}</Typography>
        <Box flexShrink={0}>
          <IconButton onClick={isOpen ? hide : show} ref={ref} size="small">
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
          {item.description}
        </Typography>
      </Popover>
    </>
  );
};
