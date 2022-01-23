// lib
import * as React from 'react';

// components
import { DataGrid } from '@mui/x-data-grid';
import { Box, styled } from '@mui/material';

// constants
import { COLUMNS, columnsConfig } from './config';
import { EMPTY_ARRAY } from 'constants/empty';
import { expandXY } from 'styles/styleObjects';

// types
import { Item } from 'types/store';

const StyledDataGrid = styled(DataGrid)`
  &.MuiDataGrid-root .MuiDataGrid-columnHeader:focus,
  &.MuiDataGrid-root .MuiDataGrid-cell:focus {
    outline: none;
  }
  .MuiDataGrid-row:nth-of-type(2n) {
    background-color: #00968833;
  }
  .MuiDataGrid-columnHeaders {
    background-color: #9c27b0;
    color: white;
    font-size: medium;
  }
  .MuiDataGrid-sortIcon,
  .MuiDataGrid-menuIcon svg {
    fill: white;
  }
  .MuiDataGrid-columnSeparator {
    visibility: hidden;
  }
`;

export const StockTable = ({
  data,
  loading,
  error,
}: {
  data: Item[];
  loading?: boolean;
  error?: Error;
}): React.ReactElement => (
  <Box {...expandXY} px={10}>
    <StyledDataGrid
      error={error}
      loading={loading}
      autoPageSize
      rows={data ?? EMPTY_ARRAY}
      columns={columnsConfig}
      density="comfortable"
      disableSelectionOnClick
      initialState={{
        sorting: {
          sortModel: [{ field: COLUMNS.LABEL, sort: 'asc' }],
        },
      }}
    />
  </Box>
);
