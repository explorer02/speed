// components
import BaseContentLoader from 'react-content-loader';

// hooks
import { useColorMode } from 'contexts/AppThemeProvider';

// constants
import { grey } from '@mui/material/colors';

export type Props = {
  height: string | number;
  width: string | number;
  viewBox?: string;
  children?: React.ReactNode;
};

export const ContentLoader = ({ height, width, children, viewBox }: Props): JSX.Element => {
  const { mode } = useColorMode();
  const colors =
    mode === 'dark'
      ? { backgroundColor: grey[500], foregroundColor: grey[800] }
      : { backgroundColor: grey[200], foregroundColor: grey[400] };
  return (
    <BaseContentLoader
      {...colors}
      height={height}
      width={width}
      speed={1}
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
};
