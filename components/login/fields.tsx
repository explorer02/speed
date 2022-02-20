// components
import { InputAdornment } from '@mui/material';
import { FormControlNumberInput } from 'reusable/form/components';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import DialpadOutlinedIcon from '@mui/icons-material/DialpadOutlined';

import { FieldMap } from 'reusable/form';

export const FIELDS = {
  PHONE: 'phone',
  OTP: 'otp',
};

export const getFieldMap = ({
  phoneInputDisabled,
  otpInputDisabled,
}: {
  phoneInputDisabled: boolean;
  otpInputDisabled: boolean;
}): FieldMap => ({
  [FIELDS.PHONE]: {
    Component: FormControlNumberInput,
    componentProps: {
      label: 'Phone Number',
      disabled: phoneInputDisabled,
      helperText: 'Please enter your phone number here...',
      placeholder: '1234567890',
      startAdornment: (
        <InputAdornment position="start">
          <LocalPhoneOutlinedIcon color="primary" />
        </InputAdornment>
      ),
    },
  },
  [FIELDS.OTP]: {
    Component: FormControlNumberInput,
    componentProps: {
      label: 'OTP',
      helperText: 'Please enter the otp sent to your phone number...',
      disabled: otpInputDisabled,
      placeholder: 'XXXXXX',
      startAdornment: (
        <InputAdornment position="start">
          <DialpadOutlinedIcon color="primary" />
        </InputAdornment>
      ),
    },
  },
});
