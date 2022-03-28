// components
import { TableCell, TableHead, TableRow } from '@mui/material';

// types
import { StringAnyMap } from 'types/generic';
import { Props } from './types';

export const Header = <T extends StringAnyMap>({
  columnConfig,
}: Pick<Props<T>, 'columnConfig'>): JSX.Element => (
  <TableHead>
    <TableRow>
      {columnConfig.map((column) => (
        <TableCell key={column.id}>{column.label}</TableCell>
      ))}
    </TableRow>
  </TableHead>
);
