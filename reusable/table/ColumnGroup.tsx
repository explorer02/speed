// lib
import { useMemo } from 'react';

// types
import { StringAnyMap } from 'types/generic';
import { Props } from './types';

export const ColumnGroup = <T extends StringAnyMap>({
  columnConfig,
}: Pick<Props<T>, 'columnConfig'>): JSX.Element => {
  const totalFluidWidth = useMemo(
    () => columnConfig.reduce((sum, column) => sum + column.fluidWidth ?? 0, 0),
    [columnConfig],
  );

  return (
    <colgroup>
      {columnConfig.map((column) => (
        <col key={column.id} width={`${(column.fluidWidth / totalFluidWidth) * 100}%`} />
      ))}
    </colgroup>
  );
};
