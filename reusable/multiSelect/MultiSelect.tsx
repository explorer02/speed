// lib
import { useCallback } from 'react';

// components
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';

// types
import { StringAnyMap } from 'types/generic';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type Props<T> = {
  id: string;
  options: T[];
  getValue?: (item: T) => string;
  valueKey?: keyof T;
  labelKey?: keyof T;
  getLabel?: (item: T) => string;
  selectedValues: string[];
  onChange: (val: string[]) => void;
  title: string;
  width?: string | number;
};

export const MultiSelect = <T extends StringAnyMap>({
  id,
  options,
  valueKey,
  getValue,
  labelKey,
  getLabel,
  selectedValues,
  onChange,
  title,
  width,
}: Props<T>): JSX.Element => {
  const handleChange = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      const { value: _value } = event.target;
      onChange(typeof _value === 'string' ? _value.split(',') : _value);
    },
    [onChange],
  );

  const labelGetter = useCallback(
    (option: T) => getLabel?.(option) ?? (option[labelKey!] as string),
    [getLabel, labelKey],
  );

  const valueGetter = useCallback(
    (option: T) => getValue?.(option) ?? (option[valueKey!] as string),
    [getValue, valueKey],
  );

  return (
    <FormControl sx={{ width: width ?? 300 }}>
      <InputLabel id={`${id}-label`}>{title}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        multiple
        value={selectedValues}
        onChange={handleChange}
        input={<OutlinedInput label={title} placeholder={`Select ${title}`} />}
        renderValue={(selected): string =>
          selected
            .map((sel) => {
              const option = options.find((_option) => valueGetter(_option) === sel);
              return labelGetter(option!);
            })
            .join(', ')
        }
        MenuProps={MenuProps}
      >
        {options.map((option) => {
          const _value = valueGetter(option);
          const _label = labelGetter(option);

          return (
            <MenuItem key={_value} value={_value}>
              <Checkbox checked={selectedValues.indexOf(_value) > -1} />
              <ListItemText primary={_label} />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
