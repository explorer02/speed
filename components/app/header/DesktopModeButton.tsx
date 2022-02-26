// components
import Head from 'next/head';
import { IconButtonWithTooltip } from 'reusable/iconButtonWithTooltip';
import DesktopMacIcon from '@mui/icons-material/DesktopMac';

// hooks
import { useToggle } from 'react-use';

// types
import { IconProps } from '@mui/material';
import { useBreakpoint } from 'hooks/useBreakpoint';

export const DesktopModeButton = ({ sx }: Pick<IconProps, 'sx'>): JSX.Element => {
  const [desktopMode, toggleDesktopMode] = useToggle(false);
  const breakpoint = useBreakpoint();

  const desktopModeHeadEl = (
    <Head>
      <meta name="viewport" content="width=1000, initial-scale=1" />
    </Head>
  );
  return (
    <>
      {desktopMode ? desktopModeHeadEl : null}
      {breakpoint === 'xs' || breakpoint === 'sm' || desktopMode ? (
        <IconButtonWithTooltip
          sx={sx}
          size="small"
          title="Set Desktop Mode"
          color={desktopMode ? 'primary' : 'default'}
          onClick={toggleDesktopMode}
        >
          <DesktopMacIcon />
        </IconButtonWithTooltip>
      ) : null}
    </>
  );
};
