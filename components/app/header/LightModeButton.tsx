// components
import { IconButtonWithTooltip } from 'reusable/iconButtonWithTooltip';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

// hooks
import { PALETTE_MODE, useColorMode } from 'contexts/AppThemeProvider';

// types
import { IconProps } from '@mui/material';

export const LightModeButton = ({ sx }: Pick<IconProps, 'sx'>): JSX.Element => {
  const colorMode = useColorMode();
  const ModeIcon = colorMode.mode === PALETTE_MODE.DARK ? <DarkModeIcon /> : <LightModeIcon />;

  return (
    <IconButtonWithTooltip
      sx={sx}
      size="small"
      title="Change Light Mode"
      color="primary"
      onClick={colorMode.toggleColorMode}
    >
      {ModeIcon}
    </IconButtonWithTooltip>
  );
};
