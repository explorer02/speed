// lib
import * as React from 'react';

// components
import GoogleMapReact from 'google-map-react';
import { Box, IconButton } from '@mui/material';

// icons
import LocationOnIcon from '@mui/icons-material/LocationOn';

// styles
import { expandXY } from 'styles/styleObjects';

// types
import { StringAnyMap } from 'types/generic';

const MAP_API_KEY = process.env.NEXT_PUBLIC_MAP_API_KEY!;

const DEFAULT_CENTER: GoogleMapReact.Coords = { lat: 28.5272803, lng: 77.0688997 };
const DEFAULT_ZOOM = 13;

type MarkerData = { location: GoogleMapReact.Coords; id: string } & StringAnyMap;

type MarkerType = (props: { lat: number; lng: number; datum: MarkerData }) => React.ReactElement;

export const Marker: MarkerType = () => (
  <IconButton color="primary" size="large">
    <LocationOnIcon />
  </IconButton>
);

const MapRenderer = ({
  markerData,
  center,
  onMarkerClick,
}: {
  center?: GoogleMapReact.Coords;
  markerData?: MarkerData[];
  onMarkerClick?: (datum: MarkerData | undefined) => void;
}): React.ReactElement => {
  const handleChildClick = React.useCallback(
    (_, childProps: { datum: MarkerData }) => {
      onMarkerClick?.(childProps.datum);
    },
    [onMarkerClick],
  );

  return (
    <Box {...expandXY} borderRadius={3} overflow="hidden">
      <GoogleMapReact
        bootstrapURLKeys={{ key: MAP_API_KEY }}
        defaultCenter={DEFAULT_CENTER}
        defaultZoom={DEFAULT_ZOOM}
        center={center}
        onChildClick={handleChildClick}
        zoom={center ? 15 : DEFAULT_ZOOM}
      >
        {markerData?.map((datum) => (
          <Marker lat={datum.location.lat} lng={datum.location.lng} key={datum.id} datum={datum} />
        ))}
      </GoogleMapReact>
    </Box>
  );
};
const MemoizedMapRenderer = React.memo(MapRenderer);
export { MemoizedMapRenderer as MapRenderer };
