// lib
import * as React from 'react';
import { useLatest } from 'react-use';

// components
import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';

// constants
import { FORM_ACTIONS } from '../constants';

// types
import { FormComponentProps } from '../FieldMap';

type Props = FormComponentProps & {
  label: string;
  helperText?: string;
  disabled?: boolean;
  type?: string;
};

export const FormControlTextInput = (props: Props): JSX.Element => {
  const {
    id,
    onAction,
    value,
    label,
    helperText,
    disabled = false,
    type = 'text',
    loading,
  } = props;

  const latestProps = useLatest(props);

  const handleChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      onAction({
        type: FORM_ACTIONS.ON_CHANGE,
        payload: {
          id,
          value: ev.target.value,
          props: latestProps.current,
        },
      });
    },
    [id, latestProps, onAction],
  );

  return (
    <FormControl fullWidth disabled={disabled || loading}>
      <InputLabel htmlFor="component-outlined" disabled={disabled || loading}>
        {label}
      </InputLabel>
      <OutlinedInput
        disabled={disabled || loading}
        id="component-outlined"
        value={value}
        onChange={handleChange}
        label={label}
        type={type}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
