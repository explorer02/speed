// lib
import { useCallback, useMemo } from 'react';
import { useLatest } from 'react-use';

// hooks
import { useStateWithRef } from 'hooks/useStateWithRef';

// constants
import { FORM_ACTIONS } from './constants';

// types
import { FormAction } from './types';
import { StringAnyMap } from 'types/generic';

type Params<T> = {
  onSubmit?: (values: T) => void;
  updater?: (
    values: T,
    payload: StringAnyMap & {
      id: string;
      value: any;
    },
  ) => T;
  initialValues: T;
  validator?: (values: T) => boolean;
};
type ReturnType<T> = {
  onAction: (action: FormAction<T>) => void;
  values: T;
  reset: () => void;
  isValidated: boolean;
};

export const useForm = <T>({
  initialValues,
  onSubmit,
  updater,
  validator,
}: Params<T>): ReturnType<T> => {
  const [values, setValues, valuesRef] = useStateWithRef(initialValues);

  const initialValuesRef = useLatest(initialValues);

  const onAction = useCallback(
    (action: FormAction<T>) => {
      switch (action.type) {
        case FORM_ACTIONS.ON_CHANGE:
          const newValues = updater?.(values, action.payload) ?? {
            ...valuesRef.current,
            [action.payload.id]: action.payload.value,
          };
          setValues(newValues);
          break;

        case FORM_ACTIONS.ON_SUBMIT:
          onSubmit?.(valuesRef.current);
          break;

        case FORM_ACTIONS.ON_RESET:
          setValues(initialValuesRef.current);
          break;

        default:
          break;
      }
    },
    [initialValuesRef, onSubmit, setValues, updater, values, valuesRef],
  );

  const reset = useCallback(() => onAction({ type: FORM_ACTIONS.ON_RESET }), [onAction]);

  const isValidated = useMemo(() => validator?.(values) ?? true, [validator, values]);

  return { onAction, reset, values, isValidated };
};
