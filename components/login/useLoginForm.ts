// lib
import * as React from 'react';

// constants
import { FormAction, useForm } from 'reusable/form';

type State = {
  email: string;
  password: string;
};
const INITIAL_VALUE: State = {
  email: '',
  password: '',
};

const validator = (values: State): boolean =>
  !!values.email.match(/^\S.*@\S+$/)?.length && values.password.length >= 6;

type UseLoginForm = () => {
  onAction: (action: FormAction<State>) => void;
  values: State;
  isSubmitDisabled: boolean;
};

export const useLoginForm: UseLoginForm = () => {
  const onSubmit = React.useCallback(() => {
    console.log('submitting');
  }, []);
  const { values, onAction, isValidated } = useForm({
    initialValues: INITIAL_VALUE,
    onSubmit,
    validator,
  });

  return { onAction, values, isSubmitDisabled: !isValidated };
};
