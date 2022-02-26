// components
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';

export const IconButtonWithTooltip = ({
  title,
  ...props
}: IconButtonProps & { title: string }): JSX.Element => (
  <Tooltip title={title}>
    <IconButton {...props} />
  </Tooltip>
);
