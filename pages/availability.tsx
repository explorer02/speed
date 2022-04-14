// lib
import * as React from 'react';

// components
import { StockViewer } from 'components/availability';
import { CommonPageLayout, SLOT_NAMES } from 'containers/pageLayout/CommonPageLayout';

// helpers
import { getStaticPropsForStoreList } from 'helper/staticPropsGetter';

// types
import { Store } from 'types/store';

const Availability = ({ stores }: { stores: Store[] }): JSX.Element => (
  <CommonPageLayout title="Stock Availability">
    <CommonPageLayout.Slot name={SLOT_NAMES.MAIN}>
      <StockViewer stores={stores} />
    </CommonPageLayout.Slot>
  </CommonPageLayout>
);

export const getStaticProps = getStaticPropsForStoreList;

export default Availability;
