// lib
import * as React from 'react';

// components
import { Box, StackProps, useTheme } from '@mui/material';

// constants
import { expandXY } from 'styles/styleObjects';
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from './constants';

// types
import { ValueOf } from 'types/generic';

export const SLOT_NAMES = {
  SIDEBAR: 'sidebar',
  MAIN: 'main',
  HEADER: 'header',
} as const;

export const PageLayout = ({
  children,
  sx,
}: {
  children?: React.ReactNode;
  sx?: StackProps['sx'];
}): JSX.Element => {
  const theme = useTheme();

  const childrenArr = React.Children.toArray(children) as JSX.Element[];
  const sidebarSlot = childrenArr.find((child) => child?.props?.name === SLOT_NAMES.SIDEBAR);
  const mainSlot = childrenArr.find((child) => child?.props?.name === SLOT_NAMES.MAIN);
  const headerSlot = childrenArr.find((child) => child?.props?.name === SLOT_NAMES.HEADER);

  return (
    <Box
      {...expandXY}
      sx={{ ...sx, background: theme.palette.background.default }}
      display="flex"
      overflow="hidden"
    >
      {sidebarSlot ? (
        <Box width={SIDEBAR_WIDTH} height="100%" id="sidebar_container">
          {sidebarSlot?.props?.children}
        </Box>
      ) : null}
      <Box flex="1 0 0" height="100%" display="flex" flexDirection="column" overflow="auto">
        <Box id="header_container">
          {headerSlot ? (
            <Box height={HEADER_HEIGHT} width="100%" marginBottom={2}>
              {headerSlot?.props?.children}
            </Box>
          ) : null}
          <Box flex="1 0 0" id="main_container" pl={2}>
            {mainSlot ? mainSlot?.props?.children : null}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

type SlotType = (props: { name: ValueOf<typeof SLOT_NAMES>; children?: JSX.Element }) => null;

const Slot: SlotType = ((): null => null) as SlotType;

PageLayout.Slot = Slot;
