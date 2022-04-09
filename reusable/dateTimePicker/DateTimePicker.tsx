// lib
import AdapterDateFns from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import BaseDateTimePicker from '@mui/lab/DateTimePicker';
import { Dayjs } from 'dayjs';
import Locale from 'dayjs/locale/en-in';
import { useCallback } from 'react';

// components
import { TextField } from '@mui/material';

type Props = {
  label: string;
  value: Date;
  onChange: (val: number) => void;
};

export const DateTimePicker = ({ label, value, onChange }: Props): JSX.Element => {
  const _onChange = useCallback(
    (val: Dayjs | null) => {
      if (val) {
        onChange(val.toDate().getTime());
      }
    },
    [onChange],
  );
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={Locale}>
      <BaseDateTimePicker
        renderInput={(props): JSX.Element => <TextField {...props} />}
        label={label}
        value={value}
        onChange={_onChange}
        ampm
        ampmInClock
      />
    </LocalizationProvider>
  );
};
