// components
import { TableCell, TableRow } from '@mui/material';
import { ContentLoader } from 'reusable/contentLoader';

// types
import { ColumnsConfig } from './types';

const ROW_HEIGHT = 50;
const ROW_GAP = 20;
const NUMBER_OF_ROWS = 7;

export const TombStone = <T,>({ columnConfig }: { columnConfig: ColumnsConfig<T> }): any => (
  <TableRow>
    <TableCell colSpan={columnConfig.length}>
      <ContentLoader
        height={ROW_HEIGHT * NUMBER_OF_ROWS + ROW_GAP * (NUMBER_OF_ROWS - 1)}
        width="100%"
      >
        {Array.from({ length: NUMBER_OF_ROWS }).map((_, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <rect x={0} y={(ROW_GAP + ROW_HEIGHT) * idx} height={ROW_HEIGHT} width="100%" key={idx} />
        ))}
      </ContentLoader>
    </TableCell>
  </TableRow>
);
