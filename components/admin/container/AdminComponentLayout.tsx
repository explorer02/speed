// lib
import { ReactNode, Children } from 'react';

// components
import { Box, BoxProps, StackProps } from '@mui/material';

// types
import { ValueOf } from 'types/generic';

export const SLOT_NAMES = {
  HEADER: 'header',
  MAIN: 'main',
} as const;

export const AdminComponentLayout = ({
  children,
  sx,
}: {
  children?: ReactNode;
  sx?: StackProps['sx'];
}): JSX.Element => {
  const childrenArr = Children.toArray(children) as JSX.Element[];
  const headerSlot = childrenArr.find((child) => child?.props?.name === SLOT_NAMES.HEADER);
  const mainSlot = childrenArr.find((child) => child?.props?.name === SLOT_NAMES.MAIN);

  return (
    <Box sx={sx} id="admin_component_container">
      {headerSlot ? (
        <Box
          id="admin_component_header_container"
          width="100%"
          marginBottom={4}
          sx={headerSlot?.props?.sx}
        >
          {headerSlot?.props?.children}
        </Box>
      ) : null}

      <Box id="admin_component_main_container" sx={mainSlot?.props?.sx}>
        {mainSlot ? mainSlot?.props?.children : null}
      </Box>
    </Box>
  );
};

type SlotType = (props: {
  name: ValueOf<typeof SLOT_NAMES>;
  children?: ReactNode;
  sx?: BoxProps['sx'];
}) => null;

const Slot: SlotType = ((): null => null) as SlotType;

AdminComponentLayout.Slot = Slot;
