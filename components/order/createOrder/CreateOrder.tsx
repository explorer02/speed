// lib
import * as React from 'react';

// components
import { Button, Grid } from '@mui/material';
import { AutoComplete, AutoCompleteProps } from 'reusable/autoComplete';
import { OrderSummaryContainer } from './components/OrderSummaryContainer';
import { SnackBarOverlay } from 'reusable/snackbarOverlay';

// hooks
import { useCreateOrder } from './hooks/useCreateOrder';
import { useSaveOrder } from './hooks/useSaveOrder';
import { useRouter } from 'next/router';

// helpers
import { getItemLabel } from 'helper/getter';

// types
import { Item, Store } from 'types/store';

export const CreateOrder = ({ stores }: { stores: Store[] }): JSX.Element => {
  const { query: queryParams } = useRouter();

  const initialStore = React.useMemo(() => {
    const storeId = queryParams.store;
    if (!storeId) return stores[0];
    return stores.find((store) => store._id === storeId) ?? stores[0];
  }, [queryParams.store, stores]);

  const {
    selectedItems,
    selectedStore,
    onStoreChange,
    onItemChange,
    items,
    itemsLoading,
    onAction,
  } = useCreateOrder({ initialStore });

  const {
    onSave: onSaveOrder,
    isSavingOrder,
    snackbarState,
  } = useSaveOrder({ selectedItems, selectedStore });

  return (
    <>
      <SnackBarOverlay {...snackbarState} />
      <Grid spacing={4} container justifyContent="space-between" id="create-order">
        <Grid item container direction="column" spacing={4} xs={12} lg={6}>
          <Grid item>
            <AutoComplete
              items={stores}
              selectedItem={selectedStore}
              onItemChange={onStoreChange as AutoCompleteProps<Store>['onItemChange']}
              idKey="_id"
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
              onItemChange={onItemChange as AutoCompleteProps<Item>['onItemChange']}
              idKey="_id"
              getOptionLabel={getItemLabel}
              label="Select Items"
              multiple
              filterSelectedOptions
              inputWidth={350}
              disableClearable={false}
              loading={itemsLoading}
              disableCloseOnSelect
            />
          </Grid>
          <Grid item container justifyContent="center" mb={8}>
            <Button
              variant="outlined"
              disabled={selectedItems.length === 0 || isSavingOrder}
              onClick={onSaveOrder}
            >
              Place Order
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={6}>
          <OrderSummaryContainer store={selectedStore} items={selectedItems} onAction={onAction} />
        </Grid>
      </Grid>
    </>
  );
};
