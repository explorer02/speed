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

// hooks
import { useOverrides, Override } from 'overrides';

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
  options: T[];
  selectedOptions?: T | T[];
  onOptionChange: (item: T | T[]) => void;
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
  overrides?: {
    Container?: Override<StringAnyMap>;
    Label?: Override<StringAnyMap>;
    Input?: Override<StringAnyMap>;
  };
  emptyItem?: T;
};

export const AutoComplete = <T extends StringAnyMap>({
  options,
  selectedOptions,
  onOptionChange,
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
  overrides,
  emptyItem,
}: AutoCompleteProps<T>): JSX.Element => {
  const handleChange: UseAutocompleteProps<T, boolean, boolean, undefined>['onChange'] =
    useCallback(
      (ev, value) => {
        if (value) onOptionChange(value);
      },
      [onOptionChange],
    );

  const getOptionLabel = useMemo(
    () => _getOptionLabel ?? ((item: T): string => (labelKey ? item[labelKey] : '')),
    [_getOptionLabel, labelKey],
  );

  const adaptedValues = useMemo(
    () => (multiple ? _castArray(selectedOptions).filter(Boolean) : selectedOptions),
    [multiple, selectedOptions],
  );

  const filterOptions = useCallback(
    (_options: T[]) => {
      const selectedOptionsId = new Set<string>(
        _castArray(selectedOptions)
          .filter(Boolean)
          .map((item) => item[idKey]),
      );
      return _options.filter((item) => !selectedOptionsId.has(item[idKey]));
    },
    [idKey, selectedOptions],
  );

  const [Container] = useOverrides(overrides?.Container, Box);
  const [Label] = useOverrides(overrides?.Label, Typography);
  const [Input] = useOverrides(overrides?.Input, TextField);

  return (
    <Container {...centerAll} gap={3}>
      <Label variant="body1">{label}</Label>
      <BaseAutoComplete<T, boolean, boolean, undefined>
        options={options}
        itemID={idKey}
        loading={loading}
        sx={{ width: `${inputWidth}px`, flexShrink: 1 }}
        getOptionLabel={getOptionLabel}
        onChange={handleChange}
        disableClearable={disableClearable}
        multiple={multiple}
        includeInputInList={includeInputInList}
        filterOptions={filterOptions}
        value={adaptedValues ?? emptyItem}
        filterSelectedOptions={filterSelectedOptions}
        disableCloseOnSelect={disableCloseOnSelect}
        disabled={disabled}
        noOptionsText="No more options.. :("
        renderInput={(params): JSX.Element => <Input {...params} label="" variant="standard" />}
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
    </Container>
  );
};
