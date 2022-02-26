// lib
import * as React from 'react';

// Components
import { Typography, TypographyProps } from '@mui/material';

// types
import { FormComponentProps } from '../FieldMap';

type Props = FormComponentProps & Pick<TypographyProps, 'color' | 'variant'>;

export const FormText = ({ value, variant, color }: Props): JSX.Element => (
  <Typography variant={variant} color={color}>
    {value}
  </Typography>
);
