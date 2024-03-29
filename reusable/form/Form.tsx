// lib
import * as React from 'react';
import _get from 'lodash/get';

// components
import { Button, Grid, Typography } from '@mui/material';
import { LoadingButton } from 'reusable/loadingButton';

// constants
import { FORM_ACTIONS } from './constants';
import { EMPTY_ARRAY } from 'constants/empty';
import { expandXY } from 'styles/styleObjects';

// types
import { StringAnyMap, StringTMap } from 'types/generic';
import { FieldMap } from './FieldMap';
import { Item, ITEM_TYPE } from './Layout';
import { FormAction, FormProps } from './types';

const DummyComponent = (props: StringAnyMap): JSX.Element => <div {...props} />;

const ItemRenderer = <T,>({
  items,
  fieldMap,
  onAction,
  value,
  errors,
  loading,
}: {
  items?: Item[];
  fieldMap: FieldMap;
  onAction: (action: FormAction<T>) => void;
  value: StringAnyMap;
  errors?: StringTMap<boolean>;
  loading?: boolean;
}): JSX.Element => (
  <>
    {(items ?? (EMPTY_ARRAY as Item[])).map((item) => {
      let Component;
      let componentProps;
      let propertyPath;
      let fieldValue;

      if (item.type === ITEM_TYPE.ROW || item.type === ITEM_TYPE.COLUMN) {
        ({ Component, componentProps, propertyPath } = fieldMap[item.id]);
        fieldValue = _get(value, propertyPath ?? item.id, value[item.id]);
      } else {
        Component = DummyComponent;
      }

      switch (item.type) {
        case ITEM_TYPE.ROW:
          return (
            <Grid key={item.id} item xs={12} {...item.style}>
              <Component
                {...componentProps}
                onAction={onAction}
                value={fieldValue}
                error={errors?.[item.id]}
                id={item.id}
                loading={loading}
              />
            </Grid>
          );
        case ITEM_TYPE.COLUMN:
          return (
            <Grid key={item.id} item xs="auto" {...item.style}>
              <Component
                {...componentProps}
                onAction={onAction}
                value={fieldValue}
                error={errors?.[item.id]}
                id={item.id}
                loading={loading}
              />
            </Grid>
          );
        case ITEM_TYPE.ROW_GROUP:
          return (
            <Grid
              key={item.label}
              item
              container
              xs={12}
              spacing={4}
              {...item.style}
              justifyContent="center"
              alignItems="center"
            >
              {item.label ? (
                <Grid item xs={12}>
                  <Typography color="primary" variant="body1">
                    {item.label}
                  </Typography>
                </Grid>
              ) : null}
              <ItemRenderer
                key={item.label}
                items={item.children}
                onAction={onAction}
                fieldMap={fieldMap}
                value={value}
                errors={errors}
                loading={loading}
              />
            </Grid>
          );
        case ITEM_TYPE.COLUMN_GROUP:
          return (
            <Grid
              item
              key={item.label}
              container
              xs={12}
              spacing={2}
              justifyContent="center"
              alignItems="center"
              {...item.style}
            >
              {item.label ? (
                <Grid item xs={12}>
                  <Typography color="primary" variant="body1">
                    {item.label}
                  </Typography>
                </Grid>
              ) : null}
              <ItemRenderer
                items={item.children}
                onAction={onAction}
                fieldMap={fieldMap}
                value={value}
                errors={errors}
                loading={loading}
              />
            </Grid>
          );
        default:
          return null;
      }
    })}
  </>
);

export const Form = <T,>({
  layout,
  fieldMap,
  onAction,
  value,
  loading,
  validator,
  config,
  ...gridProps
}: FormProps<T>): JSX.Element => {
  const resetForm = React.useCallback(() => {
    onAction({ type: FORM_ACTIONS.ON_RESET });
  }, [onAction]);

  const submitForm = React.useCallback(() => {
    onAction({ type: FORM_ACTIONS.ON_SUBMIT, payload: { value } });
  }, [onAction, value]);

  // TODO: fix validation
  const errors = React.useMemo(
    () => (validator ? validator(value) : undefined),
    [validator, value],
  );

  return (
    <Grid item container rowSpacing={4} {...layout.style} {...expandXY} {...gridProps}>
      <ItemRenderer
        items={layout.children}
        fieldMap={fieldMap}
        onAction={onAction}
        value={value}
        errors={errors}
        loading={loading}
      />
      <Grid item container rowSpacing={2} columnSpacing={4} alignItems="center">
        {(config?.reset?.visible ?? true) && (
          <Grid item xs={12} md={6}>
            <Button
              onClick={resetForm}
              fullWidth
              disabled={config?.reset?.disabled || loading}
              variant="outlined"
              sx={{ paddingX: 2, paddingY: 1 }}
            >
              {config?.reset?.label ?? 'Reset'}
            </Button>
          </Grid>
        )}
        {(config?.submit?.visible ?? true) && (
          <Grid item xs={12} md={6}>
            <LoadingButton
              onClick={submitForm}
              loading={!!loading}
              fullWidth
              variant="contained"
              size="medium"
              disabled={config?.submit?.disabled}
            >
              {config?.submit?.label ?? 'Submit'}
            </LoadingButton>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
