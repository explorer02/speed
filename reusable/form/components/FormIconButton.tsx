// lib
import * as React from 'react';

// Components
import { IconButton, IconButtonProps } from '@mui/material';

// constants
import { FORM_ACTIONS } from '../constants';

// types
import { FormComponentProps } from '../FieldMap';
import { SvgIconComponent } from '@mui/icons-material';

type Props = FormComponentProps &
  Pick<IconButtonProps, 'size' | 'color'> & {
    Icon: SvgIconComponent;
  };

export const FormIconButton = ({ onAction, id, Icon, size, color }: Props): JSX.Element => {
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
      <Icon />
    </IconButton>
  );
};
