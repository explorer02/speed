export const UNITS = ['Kg', 'Litre', 'Piece', 'Stack'] as const;

export const UNIT_OPTIONS = UNITS.map((o) => ({
  label: o,
  value: o,
}));
