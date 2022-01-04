// lib
import * as React from 'react';
import Geocode from 'react-geocode';
import _noop from 'lodash/noop';

// icons
import MyLocationIcon from '@mui/icons-material/MyLocation';
import UpdateIcon from '@mui/icons-material/Update';
import HomeIcon from '@mui/icons-material/Home';

// components
import { Box, IconButton, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormControlInput, FormControlGroup } from './components';
import { SnackBarOverlay, useSnackbar } from 'reusable/snackbarOverlay';
import { LoadingModal } from 'reusable/loadingModal';

// hooks
import { useProfileForm } from './useProfileForm';
import { useLoginInfo } from 'contexts/LoginContext';
import { useToggle } from 'hooks';
import { useFireStoreMutation } from 'hooks/firebase';

// helpers
import { getAddressFromLocalStorage, saveAddressToLocalStorage } from './helper';
import { getUserProfileDocRef } from 'helper/docReference';

// styles
import { centerAll, centerVertically } from 'styles/styleObjects';

// constants
import { ACTION_TYPES } from './actions';

Geocode.setLanguage('en');
Geocode.setRegion('in');
Geocode.setApiKey('AIzaSyA5_Ct0wRXssklQETCzxSdlDtd568FIqZA');

const ProfileForm = (): React.ReactElement => {
  const { value, onChange, dispatcher, loading } = useProfileForm();

  const updateUser = useFireStoreMutation();

  const { value: openLoadingModal, set: showLoadingModal, unset: hideLoadingModal } = useToggle();

  const { state: snackbarState, showSnackbar, hideSnackbar } = useSnackbar();

  const [geoCodeAddress, setGeoCodeAddress] = React.useState<string>();

  const { user } = useLoginInfo();
  const phone = user?.phoneNumber as string | undefined;

  const setCurrentLocation = React.useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((geoLocation) => {
        dispatcher({
          type: ACTION_TYPES.BATCH_UPDATE,
          payload: {
            location: {
              latitude: geoLocation.coords.latitude,
              longitude: geoLocation.coords.longitude,
            },
          },
        });
      });
    }
  }, [dispatcher]);

  const fetchGeoAddress = React.useCallback(async () => {
    if (value.location) {
      try {
        const storedAddress = getAddressFromLocalStorage(value.location);
        if (storedAddress) {
          setGeoCodeAddress(storedAddress);
          return;
        }
        const response = await Geocode.fromLatLng(
          `${value.location.latitude}`,
          `${value.location.longitude}`,
        );
        const address = response?.results?.[0]?.formatted_address;
        setGeoCodeAddress(address);
        saveAddressToLocalStorage(value.location, address);
      } catch (err) {
        console.error(err);
      }
    }
  }, [value.location]);

  const handleSaveProduct = React.useCallback(async () => {
    if (!phone) return;
    showLoadingModal();
    try {
      const docRef = getUserProfileDocRef(phone);
      await updateUser(docRef, value);
      showSnackbar('Data Saved Successfully :)', 'success');
    } catch (err) {
      showSnackbar('Some error Ocurred :(', 'error');
    }
    hideLoadingModal();
  }, [hideLoadingModal, phone, showLoadingModal, showSnackbar, updateUser, value]);

  return (
    <>
      <LoadingModal open={openLoadingModal || !!loading} loadingText="Please wait..." />
      <SnackBarOverlay
        open={snackbarState.open}
        onClose={hideSnackbar}
        message={snackbarState.message}
        severity={snackbarState.severity}
      />
      <Box {...centerVertically} width="100%" py={5} flexDirection="column" gap="30px">
        <FormControlInput value={value.name} onChange={onChange} label="Name" dataId="name" />
        <FormControlInput value={phone} onChange={_noop} label="Phone Number" dataId="" disabled />

        <FormControlGroup title="Location">
          <Box {...centerAll} gap="15px">
            <FormControlInput
              value={value.location?.latitude}
              label="Latitude"
              dataId="location"
              dataSubId="latitude"
              onChange={onChange}
              type="number"
            />
            <FormControlInput
              value={value.location?.longitude}
              label="Longitude"
              dataId="location"
              dataSubId="longitude"
              onChange={onChange}
              type="number"
            />
            <IconButton onClick={setCurrentLocation} color="primary">
              <MyLocationIcon />
            </IconButton>
            <IconButton onClick={fetchGeoAddress} color="primary">
              <HomeIcon />
            </IconButton>
          </Box>
          {geoCodeAddress ? (
            <Typography variant="subtitle2" mt={2} maxWidth="100%" color="secondary">
              {geoCodeAddress}
            </Typography>
          ) : null}
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
          onClick={handleSaveProduct}
        >
          Update Profile
        </LoadingButton>
      </Box>
    </>
  );
};

const MemoizedProfileForm = React.memo(ProfileForm);
MemoizedProfileForm.displayName = 'MemoizedProfileForm';

export { MemoizedProfileForm as ProfileForm };
