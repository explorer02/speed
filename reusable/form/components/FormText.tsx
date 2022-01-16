// lib
import * as React from 'react';

// Components
import { Typography, TypographyProps } from '@mui/material';

// types
import { FormComponentProps } from '../FieldMap';

export const FormText = ({
  value,
  variant,
  color,
}: FormComponentProps & Pick<TypographyProps, 'color' | 'variant'>): React.ReactElement => (
  <Typography variant={variant} color={color}>
    {value}
  </Typography>
);