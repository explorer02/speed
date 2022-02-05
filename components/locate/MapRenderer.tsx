// lib
import * as React from 'react';

// components
import GoogleMapReact from 'google-map-react';
import { Box } from '@mui/material';
import { MapMarker } from './MapMarker';

// constants
import { expandXY } from 'styles/styleObjects';

// types
import { Store } from 'types/store';

const MAP_API_KEY = process.env.NEXT_PUBLIC_MAP_API_KEY!;

const DEFAULT_CENTER: GoogleMapReact.Coords = { lat: 28.5272803, lng: 77.0688997 };
const DEFAULT_ZOOM = 12;

const MapRenderer = ({
  markerData,
  center,
  onMarkerClick,
}: {
  center?: GoogleMapReact.Coords;
  markerData?: Store[];
  onMarkerClick?: (datum: Store) => void;
}): JSX.Element => {
  const handleChildClick = React.useCallback(
    (_, childProps: { datum: Store }) => {
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
        zoom={DEFAULT_ZOOM}
      >
        {markerData?.map((datum) => (
          <MapMarker
            lat={datum.location.lat}
            lng={datum.location.lng}
            key={datum.id}
            datum={datum}
            selected={!!(datum.location.lat === center?.lat && datum.location.lng === center.lng)}
          />
        ))}
      </GoogleMapReact>
    </Box>
  );
};
const MemoizedMapRenderer = React.memo(MapRenderer);
export { MemoizedMapRenderer as MapRenderer };
