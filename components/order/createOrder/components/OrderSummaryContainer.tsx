// lib
import * as React from 'react';

// components
import { OrderSummary } from './OrderSummary';

// helpers
import { getColumnConfig } from './summaryTableConfig';

import { Item, Store } from 'types/store';
import { OnAction } from '../hooks/types';

type Props = {
  store: Store;
  items: Item[];
  onAction: OnAction;
};

export const OrderSummaryContainer = ({ store, items, onAction }: Props): JSX.Element => {
  const columnsConfig = React.useMemo(() => getColumnConfig(onAction), [onAction]);

  return <OrderSummary store={store} items={items} columnsConfig={columnsConfig} />;
};
