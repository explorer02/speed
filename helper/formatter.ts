// lib
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const priceFormatter = (value?: number): string =>
  `Rs ${(value ?? 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}/-`;

export const formatRelativeTime = (value: number): string => dayjs().to(value);
