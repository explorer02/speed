// components
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { Typography, Button, ButtonProps } from '@mui/material';

// hooks
import { useLoginInfo } from 'contexts/LoginContext';

type Props = { sx?: ButtonProps['sx'] };

export const Login = ({ sx }: Props): JSX.Element => {
  const { isLoggedIn } = useLoginInfo();
  const Icon = isLoggedIn ? LogoutIcon : LoginIcon;
  const text = isLoggedIn ? 'Log out' : 'Log in';

  // TODO: Login Modal / Logout

  return (
    <Button sx={{ ...sx, textTransform: 'none' }}>
      <Icon color="primary" sx={{ marginRight: 1 }} />
      <Typography>{text}</Typography>
    </Button>
  );
};
