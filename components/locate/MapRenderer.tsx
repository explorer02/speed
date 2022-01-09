// lib
import * as React from 'react';

// components
import GoogleMapReact from 'google-map-react';
import { Box } from '@mui/material';

// icons
import LocationOnIcon from '@mui/icons-material/LocationOn';

// hooks
import { useProfileInfo } from 'contexts/ProfileContext';

// styles
import { expandXY } from 'styles/styleObjects';

const MAP_API_KEY = process.env.NEXT_PUBLIC_MAP_API_KEY!;

const DEFAULT_CENTER: GoogleMapReact.Coords = { lat: 28.5768478, lng: 77.0909515 };
const DEFAULT_ZOOM = 11;

type MarkerType = (props: { lat: number; lng: number }) => React.ReactElement;

export const Marker: MarkerType = () => <LocationOnIcon />;

export const MapRenderer = (): React.ReactElement => {
  const { profile } = useProfileInfo();
  const mapCenter: GoogleMapReact.Coords = React.useMemo(
    () =>
      profile
        ? { lat: profile.location?.latitude ?? 0, lng: profile.location?.longitude ?? 0 }
        : DEFAULT_CENTER,
    [profile],
  );
  const stores: GoogleMapReact.Coords[] = [
    DEFAULT_CENTER,
    { lat: DEFAULT_CENTER.lat, lng: DEFAULT_CENTER.lng + 0.1 },
  ];

  return (
    <Box {...expandXY} padding={4} height={1000}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: MAP_API_KEY }}
        defaultCenter={DEFAULT_CENTER}
        defaultZoom={DEFAULT_ZOOM}
        center={mapCenter}
      >
        {stores.map((location) => (
          <Marker lat={location.lat} lng={location.lng} key={`${location.lat}${location.lng}`} />
        ))}
      </GoogleMapReact>
    </Box>
  );
};
