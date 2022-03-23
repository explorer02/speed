// constants
import { FIELDS } from './fields';

// types
import { ITEM_TYPE, Layout } from 'reusable/form';

export const LAYOUT: Layout = {
  children: [
    {
      type: ITEM_TYPE.ROW,
      id: FIELDS.NAME,
    },
    {
      type: ITEM_TYPE.ROW,
      id: FIELDS.PHONE,
    },
    {
      type: ITEM_TYPE.COLUMN_GROUP,
      label: 'Location',
      children: [
        {
          type: ITEM_TYPE.COLUMN,
          id: FIELDS.LOCATION.LATITUDE,
          style: { xs: 5 },
        },
        {
          type: ITEM_TYPE.COLUMN,
          id: FIELDS.LOCATION.LONGITUDE,
          style: { xs: 5 },
        },
        {
          type: ITEM_TYPE.COLUMN,
          id: FIELDS.LOCATION.RECENTER,
          style: { xs: 1 },
        },
        {
          type: ITEM_TYPE.COLUMN,
          id: FIELDS.LOCATION.ADDRESS_TEXT,
          style: { xs: 12 },
        },
      ],
    },
    {
      type: ITEM_TYPE.COLUMN_GROUP,
      label: 'Address',
      children: [
        {
          type: ITEM_TYPE.COLUMN,
          id: FIELDS.ADDRESS.HOUSE_NUMBER,
          style: { xs: 6 },
        },
        {
          type: ITEM_TYPE.COLUMN,
          id: FIELDS.ADDRESS.STREET,
          style: { xs: 6 },
        },
        {
          type: ITEM_TYPE.COLUMN,
          id: FIELDS.ADDRESS.LOCALITY,
          style: { xs: 6 },
        },
        {
          type: ITEM_TYPE.COLUMN,
          id: FIELDS.ADDRESS.AREA,
          style: { xs: 6 },
        },
        {
          type: ITEM_TYPE.COLUMN,
          id: FIELDS.ADDRESS.LANDMARK,
          style: { xs: 6 },
        },
        {
          type: ITEM_TYPE.COLUMN,
          id: FIELDS.ADDRESS.CITY,
          style: { xs: 6 },
        },
        {
          type: ITEM_TYPE.COLUMN,
          id: FIELDS.ADDRESS.STATE,
          style: { xs: 6 },
        },
        {
          type: ITEM_TYPE.COLUMN,
          id: FIELDS.ADDRESS.PIN_CODE,
          style: { xs: 6 },
        },
      ],
    },
  ],
};
