// components
import BaseContentLoader from 'react-content-loader';

// constants
import { grey } from '@mui/material/colors';

export type Props = {
  height: string | number;
  width: string | number;
  viewBox?: string;
  children?: React.ReactNode;
};

export const ContentLoader = ({ height, width, children, viewBox }: Props): JSX.Element => (
  <BaseContentLoader
    height={height}
    width={width}
    speed={1}
    backgroundColor={grey[100]}
    foregroundColor={grey[400]}
    viewBox={
      viewBox ??
      (typeof width === 'number' && typeof height === 'number'
        ? `0 0 ${width} ${height}`
        : undefined)
    }
  >
    {children}
  </BaseContentLoader>
);
