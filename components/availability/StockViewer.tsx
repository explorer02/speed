// lib
import * as React from 'react';

// components
import { Box, Stack } from '@mui/material';
import { StockTable } from './stockTable';
import { AutoComplete, AutoCompleteProps } from 'reusable/autoComplete';
import RefreshIcon from '@mui/icons-material/Refresh';
import { IconButtonWithTooltip } from 'reusable/iconButtonWithTooltip';

// hooks
import { useStockViewer } from './useStockViewer';

// constants
import { expandXY } from 'styles/styleObjects';

// types
import { Store } from 'types/store';

export const StockViewer = ({ stores }: { stores: Store[] }): JSX.Element => {
  const {
    isRefreshActive,
    onRefresh,
    data,
    isLoading,
    onStoreChange,
    selectedStore,
    actionState,
    onAction,
    selectedItems,
    onRowClick,
  } = useStockViewer({
    initialStore: stores[0],
  });

  return (
    <Stack gap={6} py={2} {...expandXY} sx={{ position: 'relative' }}>
      <Box flexShrink={0}>
        <AutoComplete
          items={stores}
          selectedItem={selectedStore}
          onItemChange={onStoreChange as AutoCompleteProps<Store>['onItemChange']}
          idKey="_id"
          labelKey="name"
          label="Select Store"
          secondaryTextKey="address"
          inputWidth={400}
          disabled={isLoading}
        />
      </Box>
      <Box flexGrow={1}>
        <StockTable
          items={data}
          selectedItems={selectedItems}
          onRowClick={onRowClick}
          actionState={actionState}
          onAction={onAction}
          isLoading={isLoading}
        />
      </Box>
      <IconButtonWithTooltip
        title="Refresh"
        sx={{ position: 'absolute', top: 8, right: 80 }}
        color="primary"
        size="large"
        disabled={!isRefreshActive}
        onClick={onRefresh}
      >
        <RefreshIcon />
      </IconButtonWithTooltip>
    </Stack>
  );
};
