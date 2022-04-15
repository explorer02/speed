// components
import { Form } from 'reusable/form';

// hooks
import { useCreateItem } from './hooks/useCreateItem';

// constants
import { FIELD_MAP, LAYOUT } from './formConfig';

export const CreateItem = (): JSX.Element => {
  const { onAction, values, isValidated } = useCreateItem();

  return (
    <Form
      fieldMap={FIELD_MAP}
      layout={LAYOUT}
      onAction={onAction}
      value={values}
      sx={{ width: 600 }}
      config={{ submit: { disabled: !isValidated } }}
    />
  );
};
