// types
import React from 'react';
import { StringAnyMap, StringTMap } from 'types/generic';
import { FormAction } from './types';

export type FormComponentProps = {
  onAction: (action: FormAction<StringAnyMap>) => void;
  value: any;
  id: string;
  error?: boolean;
  loading?: boolean;
};

type Field<Props extends FormComponentProps> = {
  id: string;
  Component: (
    props: React.PropsWithoutRef<Props> | React.PropsWithRef<Props>,
  ) => JSX.Element | null;
  componentProps: Omit<Props, 'id' | 'value' | 'onAction' | 'error'>;
  propertyPath?: string[];
};

export type FieldMap = StringTMap<Field<any>>;

export const FieldMapBuilder = class {
  fieldMap: FieldMap = {};

  addFieldConfig<P extends FormComponentProps>(field: Field<P>): this {
    this.fieldMap[field.id] = field;
    return this;
  }

  build(): FieldMap {
    return this.fieldMap;
  }
};
