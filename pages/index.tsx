// components
import { CommonPageLayout, SLOT_NAMES } from 'containers/pageLayout/CommonPageLayout';
import { Carousel } from 'components/home/Carousel';

// types
import { NextPage } from 'next';

const Home: NextPage = () => (
  <CommonPageLayout title="Home">
    <CommonPageLayout.Slot name={SLOT_NAMES.MAIN} sx={{ padding: 0 }}>
      <Carousel />
    </CommonPageLayout.Slot>
  </CommonPageLayout>
);

export default Home;
