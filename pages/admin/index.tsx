// lib
import * as React from 'react';

// components
import { AdminContainer } from 'components/admin';
import { CommonPageLayout, SLOT_NAMES } from 'containers/CommonPageLayout';

// helpers
import { getStaticPropsForStoreList } from 'helper/staticPropsGetter';

// types
import { Store } from 'types/store';

const AdminPage = ({ stores }: { stores: Store[] }): JSX.Element => (
  <CommonPageLayout title="Admin">
    <CommonPageLayout.Slot name={SLOT_NAMES.MAIN}>
      <AdminContainer />
    </CommonPageLayout.Slot>
  </CommonPageLayout>
);

export const getStaticProps = getStaticPropsForStoreList;

export default AdminPage;
