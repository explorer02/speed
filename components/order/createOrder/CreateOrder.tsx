// components
import { Grid } from '@mui/material';
import { AutoComplete, AutoCompleteProps } from 'reusable/autoComplete';
import { OrderSummaryContainer } from './components/OrderSummaryContainer';
import { SnackBarOverlay } from 'reusable/snackbarOverlay';
import { LoadingButton } from 'reusable/loadingButton';

// hooks
import { useCreateOrder } from './hooks/useCreateOrder';
import { useSaveOrder } from './hooks/useSaveOrder';

// helpers
import { getItemLabel } from 'helper/getter';

// types
import { Item, Store } from 'types/store';

export const CreateOrder = ({ stores }: { stores: Store[] }): JSX.Element => {
  const {
    selectedItems,
    selectedStore,
    onStoreChange,
    onItemChange,
    items,
    itemsLoading,
    onAction,
  } = useCreateOrder({ stores });

  const {
    onSave: onSaveOrder,
    isSavingOrder,
    snackbarState,
  } = useSaveOrder({ selectedItems, selectedStore });

  return (
    <>
      <SnackBarOverlay {...snackbarState} />
      <Grid spacing={8} container justifyContent="space-between" id="create-order">
        <Grid item container direction="column" spacing={4} xs={12} xl={5}>
          <Grid item>
            <AutoComplete
              items={stores}
              selectedItem={selectedStore ?? stores[0]}
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
          <Grid item container justifyContent="center">
            <LoadingButton
              variant="outlined"
              disabled={selectedItems.length === 0}
              onClick={onSaveOrder}
              loading={isSavingOrder}
              sx={{ width: 150 }}
            >
              Place Order
            </LoadingButton>
          </Grid>
        </Grid>
        <Grid item xs={12} xl={7}>
          <OrderSummaryContainer store={selectedStore} items={selectedItems} onAction={onAction} />
        </Grid>
      </Grid>
    </>
  );
};
