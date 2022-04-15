// components
import { FormControlSelectInput } from 'reusable/form/components/FormControlSelectInput';
import { FormControlTextInput } from 'reusable/form/components/FormControlTextInput';

// helpers
import { FieldMapBuilder, ITEM_TYPE, Layout } from 'reusable/form';

// constants
import { UNIT_OPTIONS } from 'constants/items';

export const FIELDS = {
  LABEL: 'label',
  DESCRIPTION: 'description',
  UNIT: 'unit',
} as const;

export const FIELD_MAP = new FieldMapBuilder()
  .addFieldConfig({
    id: FIELDS.LABEL,
    Component: FormControlTextInput,
    componentProps: {
      label: 'Name',
      placeholder: 'Guava',
      autoComplete: 'off',
    },
  })
  .addFieldConfig({
    id: FIELDS.DESCRIPTION,
    Component: FormControlTextInput,
    componentProps: {
      label: 'Description',
      placeholder: 'Guava is a fruit...',
      multiline: true,
      maxRows: 4,
    },
  })
  .addFieldConfig({
    id: FIELDS.UNIT,
    Component: FormControlSelectInput,
    componentProps: {
      label: 'Unit',
      options: UNIT_OPTIONS,
    },
  })
  .build();

// types

export const LAYOUT: Layout = {
  children: [
    {
      type: ITEM_TYPE.ROW,
      id: FIELDS.LABEL,
    },
    {
      type: ITEM_TYPE.ROW,
      id: FIELDS.DESCRIPTION,
    },
    {
      type: ITEM_TYPE.ROW,
      id: FIELDS.UNIT,
    },
  ],
};
