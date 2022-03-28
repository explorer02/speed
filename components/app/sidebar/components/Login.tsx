// components
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { Typography, Button, ButtonProps } from '@mui/material';
import { LoginFormModal } from 'components/login/LoginFormModal';

// hooks
import { useLoginInfo } from 'contexts/LoginContext';
import { useToggle } from 'hooks/useToggle';

type Props = { sx?: ButtonProps['sx'] };

export const Login = ({ sx }: Props): JSX.Element => {
  const { isLoggedIn, logout } = useLoginInfo();
  const Icon = isLoggedIn ? LogoutIcon : LoginIcon;
  const text = isLoggedIn ? 'Log out' : 'Log in';

  const { value: isModalVisible, set: showModal, unset: hideModal } = useToggle(false);

  // TODO: Login Modal / Logout

  return (
    <>
      <Button sx={{ ...sx, textTransform: 'none' }} onClick={isLoggedIn ? logout : showModal}>
        <Icon color="primary" sx={{ marginRight: 1 }} />
        <Typography>{text}</Typography>
      </Button>
      <LoginFormModal open={isModalVisible} onClose={hideModal} />
    </>
  );
};
