// lib
import * as React from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

// components
import {
  Autocomplete,
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

// icons
import StorefrontIcon from '@mui/icons-material/Storefront';

// styles
import { centerAll } from 'styles/styleObjects';

// types
import { Store } from 'types/store';

const getOptionLabel = (store: Store): string => store.name;

export const StoreSelector = ({
  stores,
  selectedStore,
}: {
  stores: Store[];
  selectedStore: Store;
}): React.ReactElement => {
  const theme = useTheme();

  return (
    <Box {...centerAll} width="100%" gap={4}>
      <Typography variant="body1">Select Store</Typography>
      <Autocomplete
        options={stores}
        itemID="id"
        sx={{ width: '300px' }}
        getOptionLabel={getOptionLabel}
        disableClearable
        value={selectedStore}
        renderInput={(params): React.ReactElement => (
          <TextField {...params} label="" variant="standard" />
        )}
        renderOption={(props, option, { inputValue }): React.ReactElement => {
          const matches = match(option.name, inputValue);
          const parts = parse(option.name, matches);

          return (
            <ListItem {...props}>
              <ListItemIcon>
                <StorefrontIcon />
              </ListItemIcon>
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
