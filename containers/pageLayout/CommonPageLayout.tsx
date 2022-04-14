// lib
import { ReactNode } from 'react';

// components
import { PageLayout, SLOT_NAMES as BASE_SLOT_NAMES } from './PageLayout';
import { Header } from 'components/app/header';
import { Sidebar } from 'components/app/sidebar';
import NextNProgress from 'nextjs-progressbar';
import { blue } from '@mui/material/colors';

export const CommonPageLayout = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}): JSX.Element => (
  <>
    <NextNProgress color={blue[700]} height={4} />
    <PageLayout>
      <PageLayout.Slot name={BASE_SLOT_NAMES.HEADER}>
        <Header title={title} />
      </PageLayout.Slot>
      <PageLayout.Slot name={BASE_SLOT_NAMES.SIDEBAR}>
        <Sidebar />
      </PageLayout.Slot>
      {children}
    </PageLayout>
  </>
);

export const SLOT_NAMES = {
  MAIN: BASE_SLOT_NAMES.MAIN,
  ACTION: BASE_SLOT_NAMES.ACTION,
};

CommonPageLayout.Slot = PageLayout.Slot;
