// components
import { Dialog, DialogContent } from '@mui/material';
import { LoginForm } from './LoginForm';

type Props = {
  open: boolean;
  onClose: () => void;
};

export const LoginFormModal = ({ open, onClose }: Props): JSX.Element => (
  <Dialog open={open} onClose={onClose}>
    <DialogContent>
      <LoginForm onSuccess={onClose} />
    </DialogContent>
  </Dialog>
);
