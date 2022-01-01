export type StringAnyMap = {
  [key: string]: any;
};

export type StringTMap<T> = {
  [key: string]: T;
};

export type Nullable<T> = T | null | undefined;
