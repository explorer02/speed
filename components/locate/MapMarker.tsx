// lib
import * as React from 'react';

// components
import { IconButton, Popover } from '@mui/material';

// icons
import LocationOnIcon from '@mui/icons-material/LocationOn';

// types
import { Store } from 'types/store';
import { StoreListItem } from './StoreListItem';
import { useToggle } from 'hooks';

type MarkerProps = {
  // eslint-disable-next-line react/no-unused-prop-types
  lat: number;
  // eslint-disable-next-line react/no-unused-prop-types
  lng: number;
  datum: Store;
  selected?: boolean;
};

// TODO: popover on marker
export const MapMarker = ({ selected, datum }: MarkerProps): React.ReactElement => {
  const { value: open, set: showPopover, unset: hidePopover } = useToggle(false);
  const anchorRef = React.useRef<HTMLButtonElement>();
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      {/*  @ts-expect-error */}
      <IconButton
        color={selected ? 'primary' : 'success'}
        size="large"
        onClick={showPopover}
        ref={anchorRef}
      >
        <LocationOnIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorRef.current}
        onClose={hidePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <StoreListItem store={datum} showOpenInNewTab={false} />
      </Popover>
    </>
  );
};
