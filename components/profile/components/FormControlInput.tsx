// lib
import * as React from 'react';

// components
import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';

export const FormControlInput = ({
  onChange,
  value,
  label,
  dataId,
  dataSubId,
  helperText,
  disabled = false,
  type = 'text',
}: {
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  label: string;
  dataId: string;
  dataSubId?: string;
  helperText?: string;
  disabled?: boolean;
  type?: string;
}): React.ReactElement => (
  <FormControl fullWidth disabled={disabled}>
    <InputLabel htmlFor="component-outlined" disabled={disabled}>
      {label}
    </InputLabel>
    <OutlinedInput
      disabled={disabled}
      id="component-outlined"
      value={value}
      onChange={onChange}
      label={label}
      inputProps={{ 'data-id': dataId, 'data-subid': dataSubId }}
      type={type}
    />
    {helperText && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
);
