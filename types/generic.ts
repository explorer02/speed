export type StringTMap<T> = {
  [key: string]: T;
};

export type StringStringMap = StringTMap<string>;

export type StringNumberMap = StringTMap<number>;

export type StringAnyMap = StringTMap<any>;

export type Nullable<T> = T | null | undefined;

export type Action = {
  type: string;
  payload: StringAnyMap;
};

export type ValueOf<T> = T[keyof T];
