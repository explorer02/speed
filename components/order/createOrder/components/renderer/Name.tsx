// components
import { Box, Tooltip, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

// helpers
import { getItemDescription } from 'helper/getter';

// constants
import { centerVertically } from 'styles/styleObjects';

// types
import { ColumnRendererProps } from 'reusable/table';
import { Item } from 'types/store';

export const Name = ({ value, entity: item }: ColumnRendererProps<Item>): JSX.Element => (
  <Box {...centerVertically} gap={2}>
    <Typography maxWidth="100%">{value}</Typography>
    <Tooltip title={getItemDescription(item)}>
      <InfoIcon fontSize="small" color="action" />
    </Tooltip>
  </Box>
);
