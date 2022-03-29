// components
import { Stack, Typography } from '@mui/material';

// constants
import { centerHorizontally } from 'styles/styleObjects';

// types
import { StringAnyMap } from 'types/generic';
import { Props } from './types';

export const Title = <T extends StringAnyMap>({
  title,
}: Pick<Props<T>, 'title'>): JSX.Element | null =>
  title ? (
    <Typography component="div" {...centerHorizontally} variant="h6">
      {title}
    </Typography>
  ) : null;

export const Caption = <T extends StringAnyMap>({
  caption,
  subCaption,
}: Pick<Props<T>, 'caption' | 'subCaption'>): JSX.Element | null =>
  caption || subCaption ? (
    <Stack>
      {caption ? (
        <Typography component="div" variant="body1">
          {caption}
        </Typography>
      ) : null}
      {subCaption ? (
        <Typography component="div" variant="body2">
          {subCaption}
        </Typography>
      ) : null}
    </Stack>
  ) : null;
