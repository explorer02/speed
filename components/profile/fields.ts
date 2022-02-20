// components
import {
  FormControlNumberInput,
  FormControlTextInput,
  FormIconButton,
  FormText,
} from 'reusable/form/components';
import MyLocationIcon from '@mui/icons-material/MyLocation';

// types
import { FieldMap } from 'reusable/form/FieldMap';
import { UserProfile } from 'types/profile';

export const FIELDS = {
  NAME: 'name',
  PHONE: 'phone',
  LOCATION: {
    LATITUDE: 'lat',
    LONGITUDE: 'lng',
    RECENTER: 'recenter',
    ADDRESS_TEXT: 'addressText',
  },
  ADDRESS: {
    HOUSE_NUMBER: 'houseNumber',
    STREET: 'street',
    LOCALITY: 'locality',
    AREA: 'area',
    LANDMARK: 'landmark',
    CITY: 'city',
    STATE: 'state',
    PIN_CODE: 'pinCode',
  },
};

export const FIELD_MAP: FieldMap<UserProfile> = {
  [FIELDS.NAME]: {
    Component: FormControlTextInput,
    componentProps: {
      label: 'Name',
    },
  },
  [FIELDS.PHONE]: {
    Component: FormControlTextInput,
    componentProps: {
      label: 'Phone',

      disabled: true,
    },
  },
  [FIELDS.LOCATION.LATITUDE]: {
    Component: FormControlNumberInput,
    componentProps: {
      label: 'Latitude',
    },
    propertyPath: ['location', FIELDS.LOCATION.LATITUDE],
  },
  [FIELDS.LOCATION.LONGITUDE]: {
    Component: FormControlNumberInput,
    componentProps: {
      label: 'Longitude',
    },
    propertyPath: ['location', FIELDS.LOCATION.LONGITUDE],
  },
  [FIELDS.LOCATION.RECENTER]: {
    Component: FormIconButton,
    componentProps: {
      Icon: MyLocationIcon,
      color: 'primary',
    },
  },

  [FIELDS.LOCATION.ADDRESS_TEXT]: {
    Component: FormText,
    componentProps: {
      value: 'aa',
      variant: 'subtitle2',
      color: 'secondary',
    },
    propertyPath: ['location', FIELDS.LOCATION.ADDRESS_TEXT],
  },
  [FIELDS.ADDRESS.HOUSE_NUMBER]: {
    Component: FormControlTextInput,
    componentProps: {
      label: 'House Number',
    },
    propertyPath: ['address', FIELDS.ADDRESS.HOUSE_NUMBER],
  },
  [FIELDS.ADDRESS.STREET]: {
    Component: FormControlTextInput,
    componentProps: {
      label: 'Street',
    },
    propertyPath: ['address', FIELDS.ADDRESS.STREET],
  },
  [FIELDS.ADDRESS.LOCALITY]: {
    Component: FormControlTextInput,
    componentProps: {
      label: 'Locality',
    },
    propertyPath: ['address', FIELDS.ADDRESS.LOCALITY],
  },
  [FIELDS.ADDRESS.AREA]: {
    Component: FormControlTextInput,
    componentProps: {
      label: 'Area',
    },
    propertyPath: ['address', FIELDS.ADDRESS.AREA],
  },
  [FIELDS.ADDRESS.LANDMARK]: {
    Component: FormControlTextInput,
    componentProps: {
      label: 'Landmark',
    },
    propertyPath: ['address', FIELDS.ADDRESS.LANDMARK],
  },
  [FIELDS.ADDRESS.CITY]: {
    Component: FormControlTextInput,
    componentProps: {
      label: 'City',
    },
    propertyPath: ['address', FIELDS.ADDRESS.CITY],
  },
  [FIELDS.ADDRESS.STATE]: {
    Component: FormControlTextInput,
    componentProps: {
      label: 'State',
    },
    propertyPath: ['address', FIELDS.ADDRESS.STATE],
  },
  [FIELDS.ADDRESS.PIN_CODE]: {
    Component: FormControlTextInput,
    componentProps: {
      label: 'Pin Code',
    },
    propertyPath: ['address', FIELDS.ADDRESS.PIN_CODE],
  },
};
