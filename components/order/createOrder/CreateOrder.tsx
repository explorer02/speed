// lib
import * as React from 'react';
import { useFirestoreQueryData } from '@react-query-firebase/firestore';

// components
import { Button, Grid } from '@mui/material';
import { AutoComplete, AutoCompleteProps } from 'reusable/autoComplete';

// helpers
import { getQueryForStoreItems } from 'helper/query';

// constants
import { expandXY } from 'styles/styleObjects';
import { OrderSummary } from './OrderSummary';
import { STOCK_COLLECTION_ITEM } from 'constants/collections';
import { EMPTY_ARRAY } from 'constants/empty';

// types
import { Item, Store } from 'types/store';

export const CreateOrder = ({ stores }: { stores: Store[] }): JSX.Element => {
  const [selectedStore, setSelectedStore] = React.useState(stores[0]);
  const [selectedItems, setSelectedItems] = React.useState(EMPTY_ARRAY);

  const query = React.useMemo(() => getQueryForStoreItems(selectedStore.id), [selectedStore.id]);

  const { data: items = EMPTY_ARRAY, isLoading } = useFirestoreQueryData<Item>(
    [STOCK_COLLECTION_ITEM, selectedStore.id],
    query,
  );

  return (
    <Grid
      {...expandXY}
      gap={2}
      direction="row"
      container
      justifyContent="space-between"
      id="create-order"
      wrap="nowrap"
    >
      <Grid item container direction="column" gap={4} xs={6} mt={5}>
        <Grid item>
          <AutoComplete
            items={stores}
            selectedItem={selectedStore}
            onItemChange={setSelectedStore as AutoCompleteProps['onItemChange']}
            idKey="id"
            labelKey="name"
            label="Select Store"
            secondaryTextKey="address"
            inputWidth={350}
          />
        </Grid>
        <Grid item>
          <AutoComplete
            items={items}
            selectedItem={selectedItems}
            onItemChange={setSelectedItems as AutoCompleteProps['onItemChange']}
            idKey="id"
            labelKey="label"
            label="Select Items"
            multiple
            filterSelectedOptions
            inputWidth={350}
            disableClearable={false}
            loading={isLoading}
          />
        </Grid>
        <Grid item container justifyContent="center">
          <Button variant="outlined" disabled={selectedItems.length === 0}>
            Place Order
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={6} height="100%">
        <OrderSummary store={selectedStore} items={selectedItems} />
      </Grid>
    </Grid>
  );
};
