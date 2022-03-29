// lib
import { useMemo, useCallback } from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import _castArray from 'lodash/castArray';

// components
import {
  Autocomplete as BaseAutoComplete,
  AutocompleteRenderOptionState,
  Box,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  UseAutocompleteProps,
  useTheme,
} from '@mui/material';

// constants
import { centerAll } from 'styles/styleObjects';

// types
import { StringAnyMap } from 'types/generic';

type OptionProps<T> = {
  liProps: React.HTMLAttributes<HTMLLIElement>;
  option: T;
  state: AutocompleteRenderOptionState;
  getOptionLabel: (item: T) => string;
  secondaryTextKey?: string;
};

const Option = <T extends StringAnyMap>({
  liProps,
  option,
  state: { inputValue },
  getOptionLabel,
  secondaryTextKey,
}: OptionProps<T>): JSX.Element => {
  const theme = useTheme();

  const matches = match(getOptionLabel(option), inputValue);
  const parts = parse(getOptionLabel(option), matches);

  return (
    <ListItem {...liProps}>
      <ListItemText
        sx={{ maxWidth: 300 }}
        primary={parts.map((part, index) => (
          <span
            // eslint-disable-next-line react/no-array-index-key
            key={`${part.text}--${index}`}
            style={{
              fontWeight: part.highlight ? 700 : 300,
              color: part.highlight ? theme.palette.secondary.dark : undefined,
            }}
          >
            {part.text}
          </span>
        ))}
        secondary={secondaryTextKey ? option[secondaryTextKey] : undefined}
        primaryTypographyProps={{ variant: 'body2' }}
        secondaryTypographyProps={{ variant: 'caption' }}
      />
    </ListItem>
  );
};

export type AutoCompleteProps<T extends StringAnyMap> = {
  items: T[];
  selectedItem: T | T[];
  onItemChange: (item: T | T[]) => void;
  idKey: keyof T & string;
  loading?: boolean;
  labelKey?: keyof T & string;
  getOptionLabel?: (item: T) => string;
  secondaryTextKey?: string;
  multiple?: boolean;
  label: string;
  includeInputInList?: boolean;
  filterSelectedOptions?: boolean;
  inputWidth?: number;
  disableClearable?: boolean;
  disableCloseOnSelect?: boolean;
  disabled?: boolean;
};

export const AutoComplete = <T extends StringAnyMap>({
  items,
  selectedItem,
  onItemChange,
  loading,
  idKey,
  labelKey,
  getOptionLabel: _getOptionLabel,
  secondaryTextKey,
  multiple,
  label,
  includeInputInList,
  filterSelectedOptions,
  inputWidth = 300,
  disableClearable = true,
  disableCloseOnSelect,
  disabled,
}: AutoCompleteProps<T>): JSX.Element => {
  const handleChange: UseAutocompleteProps<T, boolean, boolean, undefined>['onChange'] =
    useCallback(
      (ev, value) => {
        if (value) onItemChange(value);
      },
      [onItemChange],
    );

  const getOptionLabel = useMemo(
    () => _getOptionLabel ?? ((item: T): string => (labelKey ? item[labelKey] : '')),
    [_getOptionLabel, labelKey],
  );

  const adaptedValues = useMemo(
    () => (multiple ? _castArray(selectedItem) : selectedItem),
    [multiple, selectedItem],
  );

  const filterOptions = useCallback(
    (options: T[]) => {
      const selectedOptionsId = new Set<string>(
        _castArray(selectedItem).map((item) => item[idKey]),
      );
      return options.filter((item) => !selectedOptionsId.has(item[idKey]));
    },
    [idKey, selectedItem],
  );

  return (
    <Box {...centerAll} width="100%" gap={3}>
      <Typography variant="body1">{label}</Typography>
      <BaseAutoComplete<T, boolean, boolean, undefined>
        options={items}
        itemID={idKey}
        loading={loading}
        sx={{ width: `${inputWidth}px`, flexShrink: 1 }}
        getOptionLabel={getOptionLabel}
        onChange={handleChange}
        disableClearable={disableClearable}
        multiple={multiple}
        includeInputInList={includeInputInList}
        filterOptions={filterOptions}
        value={adaptedValues}
        filterSelectedOptions={filterSelectedOptions}
        disableCloseOnSelect={disableCloseOnSelect}
        disabled={disabled}
        noOptionsText="No more options.. :("
        renderInput={(params): JSX.Element => <TextField {...params} label="" variant="standard" />}
        renderOption={(props, option, state): JSX.Element => (
          <Option
            key={option[idKey]}
            liProps={props}
            option={option}
            state={state}
            getOptionLabel={getOptionLabel}
            secondaryTextKey={secondaryTextKey}
          />
        )}
      />
    </Box>
  );
};
