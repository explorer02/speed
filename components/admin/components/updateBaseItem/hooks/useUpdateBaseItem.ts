// lib
import { useCallback, useEffect, useRef, useState } from 'react';

// hooks
import { useUpdateBaseItemMutation } from './useUpdateBaseItemMutation';
import { FormAction, useForm } from 'reusable/form';
import { useSnackbar } from 'contexts/snackbarContext';
import { useFetchBaseItems } from './useFetchBaseItems';
import { BaseItem } from 'types/store';
import { usePrevious } from 'react-use';
import { stripTypename } from 'helper/stripTypenames';
import { EMPTY_ARRAY } from 'constants/empty';

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

type UseUpdateBaseItem = () => {
  onAction: (action: FormAction<State>) => void;
  values: State;
  isValidated: boolean;
  loading: boolean;
  items: BaseItem[];
  selectedItem?: BaseItem;
  onItemChange: (item: BaseItem) => void;
};

const validator = (state: State): boolean =>
  !!(state.label.length > 2 && state.description.length > 20);

export const useUpdateBaseItem: UseUpdateBaseItem = () => {
  const { data: items, loading: itemsLoading } = useFetchBaseItems({
    options: { fetchPolicy: 'cache-and-network' },
  });

  const [selectedItem, setSelectedItem] = useState<BaseItem>();

  const { saveData, loading: isSaving } = useUpdateBaseItemMutation();

  const { onSuccess, onFailure, onInfo } = useSnackbar();

  const onSubmit = useCallback(
    async (value: State) => {
      onInfo(`${value.label} is being saved...`);
      try {
        await saveData(selectedItem?._id!, value);
        onSuccess(`${value.label} saved successfully!`);
      } catch (e) {
        onFailure('Oops! Something went wrong...');
      }
    },
    [onFailure, onInfo, onSuccess, saveData, selectedItem?._id],
  );

  const { onAction, values, isValidated, reset } = useForm({
    initialValues: INITIAL_VALUES,
    onSubmit,
    validator,
  });

  const prevItems = usePrevious(items);

  useEffect(() => {
    if (items && items !== prevItems) {
      if (!selectedItem) {
        reset(stripTypename(items[0]));
        setSelectedItem(items[0]);
      } else {
        setSelectedItem((item) => items?.find((i) => i._id === item?._id));
      }
    }
  }, [items, prevItems, reset, selectedItem]);

  const onItemChange = useCallback(
    (item: BaseItem) => {
      setSelectedItem(item);
      reset(stripTypename(item));
    },
    [reset],
  );

  return {
    onAction,
    values,
    isValidated,
    loading: itemsLoading || isSaving,
    items: items ?? (EMPTY_ARRAY as BaseItem[]),
    selectedItem,
    onItemChange,
  };
};
