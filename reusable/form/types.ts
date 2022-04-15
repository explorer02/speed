import { GridProps } from '@mui/material';
import { StringAnyMap, StringTMap } from 'types/generic';
import { FORM_ACTIONS } from './constants';
import { FieldMap } from './FieldMap';
import { Layout } from './Layout';

export type FormAction<T> =
  | {
      type: typeof FORM_ACTIONS.ON_CHANGE;
      payload: StringAnyMap & {
        id: string;
        value: any;
      };
    }
  | {
      type: typeof FORM_ACTIONS.ON_CLICK;
      payload: {
        id: string;
      };
    }
  | {
      type: typeof FORM_ACTIONS.ON_SUBMIT;
      payload: {
        value: T;
      };
    }
  | {
      type: typeof FORM_ACTIONS.ON_RESET;
      payload?: {
        value: T;
      };
    };

export type FormProps<T> = {
  layout: Layout;
  fieldMap: FieldMap;
  onAction: (action: FormAction<T>) => void;
  value: T;
  loading?: boolean;
  validator?: (_value: T) => StringTMap<boolean>;
  config?: {
    submit?: {
      visible?: boolean;
      disabled?: boolean;
      label?: string;
    };
    reset?: {
      visible?: boolean;
      disabled?: boolean;
      label?: string;
    };
  };
} & GridProps;
