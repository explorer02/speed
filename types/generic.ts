export type StringAnyMap = {
  [key: string]: any;
};

export type StringTMap<T> = {
  [key: string]: T;
};

export type Nullable<T> = T | null | undefined;

export type Action = {
  type: string;
  payload: StringAnyMap;
};

export type ValueOf<T> = T[keyof T];
