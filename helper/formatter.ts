import moment from 'moment';

export const priceFormatter = (value?: number): string =>
  `Rs ${(value ?? 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}/-`;

export const formatRelativeTime = (value?: number): string => moment(value).fromNow();
