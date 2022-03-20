// constants
import { FIELDS } from './fields';

// types
import { ITEM_TYPE, Layout } from 'reusable/form';

export const LAYOUT: Layout = {
  children: [
    {
      type: ITEM_TYPE.ROW,
      id: FIELDS.EMAIL,
    },
    {
      type: ITEM_TYPE.ROW,
      id: FIELDS.PASSWORD,
    },
  ],
};
