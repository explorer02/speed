// components
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Typography, BoxProps } from '@mui/material';

// hooks
import { useLoginInfo } from 'contexts/LoginContext';

type Props = { sx?: BoxProps['sx'] };

export const Login = ({ sx }: Props): JSX.Element => {
  const { isLoggedIn } = useLoginInfo();
  const Icon = isLoggedIn ? LogoutIcon : LoginIcon;
  const text = isLoggedIn ? 'Log out' : 'Log in';

  // TODO: Login Modal / Logout

  return (
    <Box display="flex" sx={sx}>
      <Icon color="primary" sx={{ marginRight: 2 }} />
      <Typography>{text}</Typography>
    </Box>
  );
};
