// types
import { StringAnyMap } from 'types/generic';
import { FormAction } from './types';

export type FormComponentProps<T = StringAnyMap> = {
  onAction: (action: FormAction<T>) => void;
  value: any;
  id: string;
  error?: boolean;
};

export type FieldMap<T = StringAnyMap> = {
  [id: string]: {
    Component: (props: FormComponentProps<T> & any) => JSX.Element;
    componentProps?: StringAnyMap;
    propertyPath?: string[];
  };
};
