// lib
import { useCallback } from 'react';

// hooks
import { useCreateBaseItemMutation } from './useCreateBaseItemMutation';
import { FormAction, useForm } from 'reusable/form';
import { useSnackbar } from 'contexts/snackbarContext';

type State = {
  label: string;
  description: string;
  unit: string;
};

const INITIAL_VALUES: State = {
  label: '',
  description: '',
  unit: 'Kg',
};

type UseCreateBaseItem = () => {
  onAction: (action: FormAction<State>) => void;
  values: State;
  isValidated: boolean;
  loading: boolean;
};

const validator = (state: State): boolean =>
  !!(state.label.length > 2 && state.description.length > 20);

export const useCreateBaseItem: UseCreateBaseItem = () => {
  const { saveData, loading } = useCreateBaseItemMutation();

  const { onSuccess, onFailure, onInfo } = useSnackbar();

  const onSubmit = useCallback(
    async (value: State) => {
      onInfo(`${value.label} is being created...`);
      try {
        await saveData(value);
        onSuccess(`${value.label} created successfully!`);
      } catch (e) {
        onFailure('Oops! Something went wrong...');
      }
    },
    [onFailure, onInfo, onSuccess, saveData],
  );

  const { onAction, values, isValidated } = useForm({
    initialValues: INITIAL_VALUES,
    onSubmit,
    validator,
  });

  return { onAction, values, isValidated, loading };
};
