// lib
import { ReactNode, Children, useState, useEffect } from 'react';

// components
import { Box, BoxProps, StackProps, useTheme } from '@mui/material';

// constants
import { expandXY } from 'styles/styleObjects';
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from './constants';

// types
import { ValueOf } from 'types/generic';

export const SLOT_NAMES = {
  SIDEBAR: 'sidebar',
  MAIN: 'main',
  HEADER: 'header',
  ACTION: 'action',
} as const;

export const PageLayout = ({
  children,
  sx,
}: {
  children?: ReactNode;
  sx?: StackProps['sx'];
}): JSX.Element => {
  const theme = useTheme();
  const [background, setBackground] = useState('');

  useEffect(() => {
    setBackground(theme.palette.background.default);
  }, [theme.palette.background.default]);

  const childrenArr = Children.toArray(children) as JSX.Element[];
  const sidebarSlot = childrenArr.find((child) => child?.props?.name === SLOT_NAMES.SIDEBAR);
  const mainSlot = childrenArr.find((child) => child?.props?.name === SLOT_NAMES.MAIN);
  const headerSlot = childrenArr.find((child) => child?.props?.name === SLOT_NAMES.HEADER);
  const actionSlot = childrenArr.find((child) => child?.props?.name === SLOT_NAMES.ACTION);

  return (
    <Box {...expandXY} sx={{ ...sx, background }} display="flex" overflow="hidden">
      {sidebarSlot ? (
        <Box width={SIDEBAR_WIDTH} height="100%" id="sidebar_container" sx={sidebarSlot?.props?.sx}>
          {sidebarSlot?.props?.children}
        </Box>
      ) : null}
      <Box flex="1 0 0" height="100%" display="flex" flexDirection="column" overflow="auto">
        {headerSlot ? (
          <Box
            id="header_container"
            height={HEADER_HEIGHT}
            width="100%"
            marginBottom={2}
            sx={headerSlot?.props?.sx}
          >
            {headerSlot?.props?.children}
          </Box>
        ) : null}
        {actionSlot ? (
          <Box
            id="action_container"
            width="100%"
            marginBottom={2}
            flexShrink={0}
            sx={actionSlot?.props?.sx}
          >
            {actionSlot?.props?.children}
          </Box>
        ) : null}
        <Box flex="1 0 0" id="main_container" pl={2} sx={mainSlot?.props?.sx}>
          {mainSlot ? mainSlot?.props?.children : null}
        </Box>
      </Box>
    </Box>
  );
};

type SlotType = (props: {
  name: ValueOf<typeof SLOT_NAMES>;
  children?: JSX.Element;
  sx?: BoxProps['sx'];
}) => null;

const Slot: SlotType = ((): null => null) as SlotType;

PageLayout.Slot = Slot;
