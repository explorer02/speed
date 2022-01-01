// lib
import * as React from 'react';
import Geocode from 'react-geocode';
import _noop from 'lodash/noop';

// icons
import MyLocationIcon from '@mui/icons-material/MyLocation';
import UpdateIcon from '@mui/icons-material/Update';

// components
import { Box, IconButton, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormControlInput } from './FormControlInput';
import { FormControlGroup } from './FormControlGroup';

// hooks
import { useProfileForm } from './useProfileForm';
import { useLoginInfo } from 'contexts/LoginContext';

// constants
import { centerAll, centerVertically } from 'styles/styleObjects';

Geocode.setLanguage('en');
Geocode.setRegion('in');
Geocode.setApiKey('AIzaSyA5_Ct0wRXssklQETCzxSdlDtd568FIqZA');

export const ProfileForm = (): React.ReactElement => {
  const { value, onChange } = useProfileForm();

  const { user } = useLoginInfo();
  const phone = user?.phoneNumber as string | undefined;

  //   React.useEffect(() => {
  //     if (location.lat && location.lng)
  //       Geocode.fromLatLng(`${location.lat}`, `${location.lng}`)
  //         .then((response) => {
  //           setAddress(response?.results[0]?.formatted_address);
  //         })
  //         .catch((err) => {
  //           setAddress(err?.message);
  //         });
  //   }, [location]);

  //   React.useEffect(() => {
  //     getDocs(collection(fireStore, USER_COLLECTION)).then((res) => {
  //       if (res?.docs?.[0]) {
  //         const userDetails = res.docs[0].data();

  //         setName(userDetails.name);
  //         setLocation({
  //           lat: userDetails.location['_lat'] as number,
  //           lng: userDetails.location['_long'] as number,
  //         });
  //       }
  //     });
  //   }, []);

  //   const handleLatitudeChange = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
  //     setLocation((loc) => ({ ...loc, lat: parseFloat(ev.target.value) }));
  //   }, []);

  //   const handleLongitudeChange = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
  //     setLocation((loc) => ({ ...loc, lng: parseFloat(ev.target.value) }));
  //   }, []);

  //   const setCurrentLocation = (): void => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition((geoLocation) => {
  //         setLocation({ lat: geoLocation.coords.latitude, lng: geoLocation.coords.longitude });
  //       });
  //     }
  //   };

  return (
    <Box {...centerVertically} width="100%" py={5} flexDirection="column" gap="30px">
      <FormControlInput value={value.name} onChange={onChange} label="Name" dataId="name" />
      <FormControlInput value={phone} onChange={_noop} label="Phone Number" dataId="" disabled />

      <FormControlGroup title="Location">
        <Box {...centerAll} gap="20px">
          <FormControlInput
            value={value.location?.latitude}
            label="Latitude"
            dataId="location"
            dataSubId="latitude"
            onChange={onChange}
          />
          <FormControlInput
            value={value.location?.latitude}
            label="Longitude"
            dataId="location"
            dataSubId="longitude"
            onChange={onChange}
          />
          <IconButton onClick={(): void => {}} color="primary">
            <MyLocationIcon />
          </IconButton>
        </Box>
        <Typography variant="subtitle2" mt={2} maxWidth="100%" color="secondary">
          {'address' || 'Loading...'}
        </Typography>
      </FormControlGroup>

      <FormControlGroup title="Address">
        <Box {...centerAll} gap="20px">
          <FormControlInput
            value={value.address?.houseNumber}
            label="House Number"
            dataId="address"
            dataSubId="houseNumber"
            onChange={onChange}
          />
          <FormControlInput
            value={value.address?.street}
            label="Street"
            dataId="address"
            dataSubId="street"
            onChange={onChange}
          />
        </Box>

        <Box {...centerAll} gap="20px" mt={2} mb={2}>
          <FormControlInput
            value={value.address?.locality}
            label="Locality"
            dataId="address"
            dataSubId="locality"
            onChange={onChange}
          />
          <FormControlInput
            value={value.address?.area}
            label="Area"
            dataId="address"
            dataSubId="area"
            onChange={onChange}
          />
        </Box>

        <Box {...centerAll} gap="20px" mt={2}>
          <FormControlInput
            value={value.address?.landmark}
            label="Landmark"
            dataId="address"
            dataSubId="landmark"
            onChange={onChange}
          />
          <FormControlInput
            value={value.address?.city}
            label="City"
            dataId="address"
            dataSubId="city"
            onChange={onChange}
          />
        </Box>
        <Box {...centerAll} gap="20px" mt={2}>
          <FormControlInput
            value={value.address?.state}
            label="State"
            dataId="address"
            dataSubId="state"
            onChange={onChange}
          />
          <FormControlInput
            value={value.address?.pinCode}
            label="Pin Code"
            dataId="address"
            dataSubId="pinCode"
            onChange={onChange}
          />
        </Box>
      </FormControlGroup>

      <LoadingButton
        variant="contained"
        fullWidth
        size="large"
        sx={{ padding: 2 }}
        startIcon={<UpdateIcon />}
        loading={false}
        loadingIndicator="Please wait..."
      >
        Update Profile
      </LoadingButton>
    </Box>
  );
};
