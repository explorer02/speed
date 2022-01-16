// lib
import * as React from 'react';
import { useLatest } from 'react-use';

// components
import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';

// constants
import { FORM_ACTIONS } from '../constants';

// types
import { FormComponentProps } from '../FieldMap';
import { StringAnyMap } from 'types/generic';

type Props = FormComponentProps & {
  label: string;
  helperText?: string;
  disabled?: boolean;
  type?: string;
} & StringAnyMap;

export const FormControlTextInput = (props: Props): React.ReactElement => {
  const { id, onAction, value, label, helperText, disabled = false, type = 'text' } = props;

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
    <FormControl fullWidth disabled={disabled}>
      <InputLabel htmlFor="component-outlined" disabled={disabled}>
        {label}
      </InputLabel>
      <OutlinedInput
        disabled={disabled}
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
