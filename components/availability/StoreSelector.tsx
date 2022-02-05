// lib
import * as React from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

// components
import {
  Autocomplete,
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
import { Store } from 'types/store';

const getOptionLabel = (store: Store): string => store.name;

export const StoreSelector = ({
  stores,
  selectedStore,
  onStoreChange,
}: {
  stores: Store[];
  selectedStore: Store;
  onStoreChange: (store: Store) => void;
}): React.ReactElement => {
  const theme = useTheme();

  const handleChange: UseAutocompleteProps<Store, false, true, undefined>['onChange'] =
    React.useCallback(
      (ev, value) => {
        if (value) onStoreChange(value);
      },
      [onStoreChange],
    );

  return (
    <Box {...centerAll} width="100%" gap={4}>
      <Typography variant="body1">Select Store</Typography>
      <Autocomplete<Store, false, true, undefined>
        options={stores}
        itemID="id"
        sx={{ width: '300px' }}
        getOptionLabel={getOptionLabel}
        onChange={handleChange}
        disableClearable
        includeInputInList
        value={selectedStore}
        renderInput={(params): React.ReactElement => (
          <TextField {...params} label="" variant="standard" />
        )}
        renderOption={(props, option, { inputValue }): React.ReactElement => {
          const matches = match(option.name, inputValue);
          const parts = parse(option.name, matches);

          return (
            <ListItem {...props}>
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
                secondary={option.address}
                primaryTypographyProps={{ fontSize: '17px' }}
                secondaryTypographyProps={{ fontSize: '14px' }}
              />
            </ListItem>
          );
        }}
      />
    </Box>
  );
};
