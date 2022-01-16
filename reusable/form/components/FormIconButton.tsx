// lib
import * as React from 'react';

// Components
import { IconButton, IconButtonProps } from '@mui/material';

// constants
import { FORM_ACTIONS } from '../constants';

// types
import { FormComponentProps } from '../FieldMap';

export const FormIconButton = ({
  onAction,
  id,
  Icon,
  size,
  color,
}: FormComponentProps &
  Pick<IconButtonProps, 'size' | 'color'> & {
    Icon?: () => React.ReactElement;
  }): React.ReactElement => {
  const handleClick = React.useCallback(() => {
    onAction({
      type: FORM_ACTIONS.ON_CLICK,
      payload: {
        id,
      },
    });
  }, [id, onAction]);
  return (
    <IconButton onClick={handleClick} size={size} color={color}>
      {Icon ? <Icon /> : null}
    </IconButton>
  );
};
