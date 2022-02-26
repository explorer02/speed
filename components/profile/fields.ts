// components
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { FormControlNumberInput } from 'reusable/form/components/FormControlNumberInput';
import { FormControlTextInput } from 'reusable/form/components/FormControlTextInput';
import { FormIconButton } from 'reusable/form/components/FormIconButton';
import { FormText } from 'reusable/form/components/FormText';

// builders
import { FieldMapBuilder } from 'reusable/form/FieldMap';

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
} as const;

export const FIELD_MAP = new FieldMapBuilder()
  .addFieldConfig({
    id: FIELDS.NAME,
    Component: FormControlTextInput,
    componentProps: {
      label: 'Name',
    },
  })
  .addFieldConfig({
    id: FIELDS.PHONE,
    Component: FormControlTextInput,
    componentProps: {
      label: 'Phone',
      disabled: true,
    },
  })
  .addFieldConfig({
    id: FIELDS.LOCATION.LATITUDE,
    Component: FormControlNumberInput,
    componentProps: {
      label: 'Latitude',
    },
    propertyPath: ['location', FIELDS.LOCATION.LATITUDE],
  })
  .addFieldConfig({
    id: FIELDS.LOCATION.LONGITUDE,
    Component: FormControlNumberInput,
    componentProps: {
      label: 'Longitude',
    },
    propertyPath: ['location', FIELDS.LOCATION.LONGITUDE],
  })
  .addFieldConfig({
    id: FIELDS.LOCATION.RECENTER,
    Component: FormIconButton,
    componentProps: {
      Icon: MyLocationIcon,
      color: 'primary',
    },
  })
  .addFieldConfig({
    id: FIELDS.LOCATION.ADDRESS_TEXT,
    Component: FormText,
    componentProps: {
      variant: 'subtitle2',
      color: 'secondary',
    },
    propertyPath: ['location', FIELDS.LOCATION.ADDRESS_TEXT],
  })
  .addFieldConfig({
    id: FIELDS.ADDRESS.HOUSE_NUMBER,
    Component: FormControlTextInput,
    componentProps: {
      label: 'House Number',
    },
    propertyPath: ['address', FIELDS.ADDRESS.HOUSE_NUMBER],
  })
  .addFieldConfig({
    id: FIELDS.ADDRESS.STREET,
    Component: FormControlTextInput,
    componentProps: {
      label: 'Street',
    },
    propertyPath: ['address', FIELDS.ADDRESS.STREET],
  })
  .addFieldConfig({
    id: FIELDS.ADDRESS.LOCALITY,
    Component: FormControlTextInput,
    componentProps: {
      label: 'Locality',
    },
    propertyPath: ['address', FIELDS.ADDRESS.LOCALITY],
  })
  .addFieldConfig({
    id: FIELDS.ADDRESS.AREA,
    Component: FormControlTextInput,
    componentProps: {
      label: 'Area',
    },
    propertyPath: ['address', FIELDS.ADDRESS.AREA],
  })
  .addFieldConfig({
    id: FIELDS.ADDRESS.LANDMARK,
    Component: FormControlTextInput,
    componentProps: {
      label: 'Landmark',
    },
    propertyPath: ['address', FIELDS.ADDRESS.LANDMARK],
  })
  .addFieldConfig({
    id: FIELDS.ADDRESS.CITY,
    Component: FormControlTextInput,
    componentProps: {
      label: 'City',
    },
    propertyPath: ['address', FIELDS.ADDRESS.CITY],
  })
  .addFieldConfig({
    id: FIELDS.ADDRESS.STATE,
    Component: FormControlTextInput,
    componentProps: {
      label: 'State',
    },
    propertyPath: ['address', FIELDS.ADDRESS.STATE],
  })
  .addFieldConfig({
    id: FIELDS.ADDRESS.PIN_CODE,
    Component: FormControlTextInput,
    componentProps: {
      label: 'Pin Code',
    },
    propertyPath: ['address', FIELDS.ADDRESS.PIN_CODE],
  })
  .build();
