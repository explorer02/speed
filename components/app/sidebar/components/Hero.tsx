// components
import { Box, BoxProps, Typography } from '@mui/material';
import WebhookIcon from '@mui/icons-material/Webhook';

// constants
import { centerVertically } from 'styles/styleObjects';

type Props = { sx?: BoxProps['sx'] };

export const Hero = ({ sx }: Props): JSX.Element => (
  <Box {...centerVertically} sx={sx}>
    <WebhookIcon color="primary" fontSize="large" />
    <Typography variant="h6" ml={1}>
      Speed
    </Typography>
  </Box>
);
