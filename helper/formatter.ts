export const priceFormatter = (value: Number): string =>
  `Rs ${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}/-`;
