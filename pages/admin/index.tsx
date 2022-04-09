// lib
import * as React from 'react';

// components
import { AdminContainer } from 'components/admin';
import { CommonPageLayout, SLOT_NAMES } from 'containers/CommonPageLayout';

// helpers
import { getStaticPropsForStoreList } from 'helper/staticPropsGetter';

// types
import { Store } from 'types/store';
import { StoreListProvider } from 'contexts/StoreListContext';

const AdminPage = ({ stores }: { stores: Store[] }): JSX.Element => (
  <StoreListProvider value={{ storeList: stores }}>
    <CommonPageLayout title="Admin">
      <CommonPageLayout.Slot name={SLOT_NAMES.MAIN} sx={{ paddingLeft: 4, paddingTop: 2 }}>
        <AdminContainer />
      </CommonPageLayout.Slot>
    </CommonPageLayout>
  </StoreListProvider>
);

export const getStaticProps = getStaticPropsForStoreList;

export default AdminPage;
