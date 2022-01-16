// lib
import * as React from 'react';
import { useLatest } from 'react-use';

// components
import {
  experimentalStyled,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
} from '@mui/material';

// constants
import { FORM_ACTIONS } from '../constants';

// types
import { FormComponentProps } from '../FieldMap';
import { StringAnyMap } from 'types/generic';

type Props = FormComponentProps &
  Pick<OutlinedInputProps, 'placeholder' | 'disabled' | 'startAdornment'> & {
    label: string;
    helperText?: string;
  } & StringAnyMap;

const InputComponent = experimentalStyled(OutlinedInput)`
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
`;

export const FormControlNumberInput = (props: Props): React.ReactElement => {
  const {
    id,
    onAction,
    value,
    label,
    helperText,
    disabled = false,
    placeholder,
    startAdornment,
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
    <FormControl fullWidth disabled={disabled}>
      <InputLabel htmlFor="component-outlined" disabled={disabled}>
        {label}
      </InputLabel>
      <InputComponent
        disabled={disabled}
        id="component-outlined"
        value={value}
        onChange={handleChange}
        label={label}
        type="number"
        className=".no_spinner"
        placeholder={placeholder}
        startAdornment={startAdornment}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
