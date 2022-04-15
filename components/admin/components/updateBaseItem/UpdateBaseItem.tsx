// components
import { Box } from '@mui/material';
import { Form } from 'reusable/form';
import { AutoComplete, AutoCompleteProps } from 'reusable/autoComplete';

// hooks
import { useUpdateBaseItem } from './hooks/useUpdateBaseItem';

// constants
import { FIELD_MAP, LAYOUT } from 'components/admin/components/createBaseItem/formConfig';

// types
import { BaseItem } from 'types/store';

const AUTOCOMPLETE_OVERRIDES = {
  Label: { component: (): null => null },
  Input: {
    props: {
      variant: 'outlined',
      label: 'Item',
    },
  },
  Container: {
    props: {
      width: '300px',
      mb: 4,
    },
  },
};

const EMPTY_ITEM: BaseItem = {
  label: '',
  description: '',
  _id: '',
  unit: '',
};

export const UpdateBaseItem = (): JSX.Element => {
  const { onAction, values, isValidated, items, loading, onItemChange, selectedItem } =
    useUpdateBaseItem();

  return (
    <Box>
      <AutoComplete
        inputWidth={300}
        label=""
        overrides={AUTOCOMPLETE_OVERRIDES}
        options={items}
        selectedOptions={selectedItem}
        onOptionChange={onItemChange as AutoCompleteProps<BaseItem>['onOptionChange']}
        idKey="_id"
        labelKey="label"
        loading={loading}
        emptyItem={EMPTY_ITEM}
      />
      <Form
        fieldMap={FIELD_MAP}
        layout={LAYOUT}
        onAction={onAction}
        value={values}
        sx={{ width: 600 }}
        config={{ submit: { disabled: !isValidated, label: 'Update' } }}
      />
    </Box>
  );
};
