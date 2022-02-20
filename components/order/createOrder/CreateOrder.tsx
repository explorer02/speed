// lib
import * as React from 'react';

// components
import { Button, Grid } from '@mui/material';
import { AutoComplete, AutoCompleteProps } from 'reusable/autoComplete';
import { OrderSummary } from './OrderSummary';

// hooks
import { useCreateOrder } from './useCreateOrder';

// constants
import { expandXY } from 'styles/styleObjects';

// types
import { Store } from 'types/store';

export const CreateOrder = ({ stores }: { stores: Store[] }): JSX.Element => {
  const {
    selectedItems,
    selectedStore,
    onStoreChange,
    onItemChange,
    items,
    itemsLoading,
    onAction,
  } = useCreateOrder({ initialStore: stores[0] });

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
            onItemChange={onStoreChange as AutoCompleteProps['onItemChange']}
            idKey="id"
            labelKey="name"
            label="Select Store"
            filterSelectedOptions
            secondaryTextKey="address"
            inputWidth={350}
          />
        </Grid>
        <Grid item>
          <AutoComplete
            items={items}
            selectedItem={selectedItems}
            onItemChange={onItemChange as AutoCompleteProps['onItemChange']}
            idKey="id"
            labelKey="label"
            label="Select Items"
            multiple
            filterSelectedOptions
            inputWidth={350}
            disableClearable={false}
            loading={itemsLoading}
          />
        </Grid>
        <Grid item container justifyContent="center">
          <Button variant="outlined" disabled={selectedItems.length === 0}>
            Place Order
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={6} height="100%">
        <OrderSummary store={selectedStore} items={selectedItems} onAction={onAction} />
      </Grid>
    </Grid>
  );
};
