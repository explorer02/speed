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
}: {
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  label: string;
  dataId: string;
  dataSubId?: string;
  helperText?: string;
  disabled?: boolean;
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
    />
    {helperText && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
);
