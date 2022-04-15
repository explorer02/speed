// lib
import { useCallback } from 'react';
import { useLatest } from 'react-use';

// components
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
} from '@mui/material';

// constants
import { FORM_ACTIONS } from '../constants';

// types
import { FormComponentProps } from '../FieldMap';
import { StringAnyMap } from 'types/generic';

type Option = StringAnyMap;

type Props = FormComponentProps & {
  label: string;
  helperText?: string;
  options: Option[];
  labelKey?: string;
  valueKey?: string;
  getLabel?: (op: Option) => string | number;
  getValue?: (op: Option) => string | number;
} & Pick<SelectProps, 'placeholder' | 'startAdornment' | 'disabled' | 'label'>;

export const FormControlSelectInput = (props: Props): JSX.Element => {
  const {
    id,
    onAction,
    value,
    label,
    helperText,
    disabled = false,
    loading,
    options,
    labelKey = 'label',
    getLabel,
    valueKey = 'value',
    getValue,
  } = props;

  const labelGetter = useCallback(
    (option: Option) => getLabel?.(option) ?? option[labelKey],
    [getLabel, labelKey],
  );
  const valueGetter = useCallback(
    (option: Option) => getValue?.(option) ?? option[valueKey],
    [getValue, valueKey],
  );

  const latestProps = useLatest(props);

  const handleChange = useCallback(
    (ev: SelectChangeEvent<HTMLInputElement>) => {
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
      <InputLabel disabled={disabled || loading}>{label}</InputLabel>
      <Select value={value} label={label} onChange={handleChange}>
        {options.map((option) => (
          <MenuItem key={valueGetter(option)} value={valueGetter(option)}>
            {labelGetter(option)}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
