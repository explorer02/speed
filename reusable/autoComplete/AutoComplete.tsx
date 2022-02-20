// lib
import * as React from 'react';
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

// TODO: fix types
type OptionProps = {
  liProps: React.HTMLAttributes<HTMLLIElement>;
  option: StringAnyMap;
  state: AutocompleteRenderOptionState;
  labelKey: string;
  secondaryTextKey?: string;
};

const Option = ({
  liProps,
  option,
  state: { inputValue },
  labelKey,
  secondaryTextKey,
}: OptionProps): JSX.Element => {
  const theme = useTheme();

  const matches = match(option[labelKey], inputValue);
  const parts = parse(option[labelKey], matches);

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
        primaryTypographyProps={{ fontSize: '17px' }}
        secondaryTypographyProps={{ fontSize: '14px' }}
      />
    </ListItem>
  );
};

export type AutoCompleteProps = {
  items: StringAnyMap[];
  selectedItem: StringAnyMap | StringAnyMap[];
  onItemChange: (item: StringAnyMap) => void;
  idKey: string;
  loading?: boolean;
  labelKey: string;
  secondaryTextKey?: string;
  multiple?: boolean;
  label: string;
  includeInputInList?: boolean;
  filterSelectedOptions?: boolean;
  inputWidth?: number;
  disableClearable?: boolean;
  disabled?: boolean;
};

export const AutoComplete = ({
  items,
  selectedItem,
  onItemChange,
  loading,
  idKey,
  labelKey,
  secondaryTextKey,
  multiple,
  label,
  includeInputInList,
  filterSelectedOptions,
  inputWidth = 300,
  disableClearable = true,
  disabled,
}: AutoCompleteProps): JSX.Element => {
  const handleChange: UseAutocompleteProps<StringAnyMap, boolean, boolean, undefined>['onChange'] =
    React.useCallback(
      (ev, value) => {
        if (value) onItemChange(value);
      },
      [onItemChange],
    );

  const getOptionLabel = React.useCallback((item: StringAnyMap) => item[labelKey], [labelKey]);

  const adaptedValues = React.useMemo(
    () => (multiple ? _castArray(selectedItem) : selectedItem),
    [multiple, selectedItem],
  );

  return (
    <Box {...centerAll} width="100%" gap={4}>
      <Typography variant="body1">{label}</Typography>
      <BaseAutoComplete<StringAnyMap, boolean, boolean, undefined>
        options={items}
        itemID={idKey}
        loading={loading}
        sx={{ width: `${inputWidth}px` }}
        getOptionLabel={getOptionLabel}
        onChange={handleChange}
        disableClearable={disableClearable}
        multiple={multiple}
        includeInputInList={includeInputInList}
        value={adaptedValues as StringAnyMap[]}
        filterSelectedOptions={filterSelectedOptions}
        disabled={disabled}
        renderInput={(params): JSX.Element => <TextField {...params} label="" variant="standard" />}
        renderOption={(props, option, state): JSX.Element => (
          <Option
            key={option[idKey]}
            liProps={props}
            option={option}
            state={state}
            labelKey={labelKey}
            secondaryTextKey={secondaryTextKey}
          />
        )}
      />
    </Box>
  );
};
