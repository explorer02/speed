// components
import { Form } from 'reusable/form';

// hooks
import { useCreateBaseItem } from './hooks/useCreateBaseItem';

// constants
import { FIELD_MAP, LAYOUT } from './formConfig';

export const CreateBaseItem = (): JSX.Element => {
  const { onAction, values, isValidated, loading } = useCreateBaseItem();

  return (
    <Form
      fieldMap={FIELD_MAP}
      layout={LAYOUT}
      onAction={onAction}
      value={values}
      loading={loading}
      sx={{ width: 600 }}
      config={{ submit: { disabled: !isValidated, label: 'Create' } }}
    />
  );
};
