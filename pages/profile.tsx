// lib
import * as React from 'react';
import { collection, getDocs } from '@firebase/firestore';
import Geocode from 'react-geocode';

// icons
import MyLocationIcon from '@mui/icons-material/MyLocation';
import UpdateIcon from '@mui/icons-material/Update';

// components
import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// contexts
import { PhoneContext } from 'contexts/UserContext';

// constants
import { fireStore } from 'firebaseConfig';
import { centerAll, centerVertically } from 'utils/commonProps';
import { USER_COLLECTION } from 'constants/collections';

// types
import { NextPage } from 'next';
import { useValidateInput } from 'hooks/useValidateInput';

Geocode.setLanguage('en');
Geocode.setRegion('in');
Geocode.setApiKey('AIzaSyA5_Ct0wRXssklQETCzxSdlDtd568FIqZA');

const Profile: NextPage = () => {
  const [name, handleNameChange, setName] = useValidateInput({
    initialValue: '',
    regex: /[a-zA-Z ]+/,
    maxLength: 30,
  });

  const [location, setLocation] = React.useState({
    lat: 0,
    lng: 0,
  });

  const { phone } = React.useContext(PhoneContext);

  const [address, setAddress] = React.useState<string>();

  React.useEffect(() => {
    if (location.lat && location.lng)
      Geocode.fromLatLng(`${location.lat}`, `${location.lng}`)
        .then((response) => {
          setAddress(response?.results[0]?.formatted_address);
        })
        .catch((err) => {
          setAddress(err?.message);
        });
  }, [location]);

  React.useEffect(() => {
    getDocs(collection(fireStore, USER_COLLECTION)).then((res) => {
      if (res?.docs?.[0]) {
        const userDetails = res.docs[0].data();

        setName(userDetails.name);
        setLocation({
          lat: userDetails.location['_lat'] as number,
          lng: userDetails.location['_long'] as number,
        });
      }
    });
  }, []);

  const handleLatitudeChange = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    setLocation((loc) => ({ ...loc, lat: parseFloat(ev.target.value) }));
  }, []);

  const handleLongitudeChange = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    setLocation((loc) => ({ ...loc, lng: parseFloat(ev.target.value) }));
  }, []);

  const setCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((geoLocation) => {
        setLocation({ lat: geoLocation.coords.latitude, lng: geoLocation.coords.longitude });
      });
    }
  };

  return (
    <Box minHeight="50%" width="40%" {...centerVertically} flexDirection="column" gap="40px">
      <FormControl fullWidth>
        <InputLabel htmlFor="component-outlined">Name</InputLabel>
        <OutlinedInput
          id="component-outlined"
          value={name}
          onChange={handleNameChange}
          label="Name"
        />
        <FormHelperText>Please enter your name...</FormHelperText>
      </FormControl>

      <FormControl fullWidth disabled>
        <InputLabel htmlFor="component-outlined">Phone Number</InputLabel>
        <OutlinedInput
          id="component-outlined"
          value={phone}
          onChange={handleLatitudeChange}
          label="Phone Number"
        />
      </FormControl>
      <Box width="100%">
        <Typography color="primary" variant="body1">
          Location
        </Typography>
        <Box {...centerAll} gap="20px" mt={2}>
          <FormControl fullWidth>
            <InputLabel htmlFor="component-outlined">Latitude</InputLabel>
            <OutlinedInput
              id="component-outlined"
              value={location.lat}
              onChange={handleLatitudeChange}
              label="Latitude"
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="component-outlined">Longitude</InputLabel>
            <OutlinedInput
              id="component-outlined"
              value={location.lng}
              onChange={handleLongitudeChange}
              label="Longitude"
            />
          </FormControl>
          <IconButton onClick={setCurrentLocation} color="primary">
            <MyLocationIcon />
          </IconButton>
        </Box>
        <Typography variant="subtitle2" mt={2} maxWidth="100%">
          {address || 'Loading...'}
        </Typography>
      </Box>
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

export default Profile;
