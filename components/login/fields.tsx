// components
import { FormControlTextInput } from 'reusable/form/components/FormControlTextInput';
import { InputAdornment } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';

import { FieldMap, FieldMapBuilder } from 'reusable/form';

export const FIELDS = {
  EMAIL: 'email',
  PASSWORD: 'password',
};

export const FIELD_MAP: FieldMap = new FieldMapBuilder()
  .addFieldConfig({
    id: FIELDS.EMAIL,
    Component: FormControlTextInput,
    componentProps: {
      label: 'Email Address',
      helperText: 'Please enter a valid email address...',
      placeholder: 'abc@gmail.com',
      type: 'email',
      startAdornment: (
        <InputAdornment position="start">
          <EmailIcon color="primary" />
        </InputAdornment>
      ),
    },
  })
  .addFieldConfig({
    id: FIELDS.PASSWORD,
    Component: FormControlTextInput,
    componentProps: {
      label: 'Password',
      helperText: 'Password should be atleast 6 characters...',
      placeholder: 'XXXXXX',
      type: 'password',
      startAdornment: (
        <InputAdornment position="start">
          <PasswordIcon color="primary" />
        </InputAdornment>
      ),
    },
  })
  .build();
