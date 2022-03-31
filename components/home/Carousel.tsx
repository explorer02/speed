// lib
import { memo } from 'react';

// components
import { Box } from '@mui/material';
import Midhope from './images/midhope.jpg';
import Image from 'next/image';

// constants
import { expandXY } from 'styles/styleObjects';

const Carousel = (): JSX.Element => (
  <Box {...expandXY} position="relative">
    <Image src={Midhope} alt="" layout="fill" loading="lazy" />
  </Box>
);

const MemoizedCarousel = memo(Carousel);
MemoizedCarousel.displayName = 'Carousel';

export { MemoizedCarousel as Carousel };
