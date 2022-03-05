// lib
import * as React from 'react';

// components
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';

export const IconButtonWithTooltip = React.forwardRef(
  ({ title, ...props }: IconButtonProps & { title: string }, ref): JSX.Element => (
    <Tooltip title={title}>
      <IconButton {...props} ref={ref as React.Ref<HTMLButtonElement>} />
    </Tooltip>
  ),
);
