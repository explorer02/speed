import { StringTMap } from 'types/generic';

export type ComponentOverride<T> = (
  props: React.PropsWithRef<T> | React.PropsWithoutRef<T>,
) => JSX.Element | null;

export type Override<T> = {
  component?: ComponentOverride<T>;
  props?: any;
};

export type Overrides<T> = StringTMap<Override<T>>;
