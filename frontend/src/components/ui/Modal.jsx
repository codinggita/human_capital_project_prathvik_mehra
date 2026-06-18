import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Grow,
} from '@mui/material';
import { FiX } from 'react-icons/fi';

const Modal = ({ open, onClose, title, children, actions, maxWidth = 'sm' }) => (
  <Dialog
    open={open}
    onClose={onClose}
    maxWidth={maxWidth}
    fullWidth
    TransitionComponent={Grow}
    transitionDuration={250}
    PaperProps={{
      sx: { borderRadius: 4, p: 1 },
    }}
  >
    <DialogTitle
      component="div"
      sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
    >
      <Typography variant="h6" fontWeight="bold">
        {title}
      </Typography>
      <IconButton onClick={onClose} size="small">
        <FiX />
      </IconButton>
    </DialogTitle>
    <DialogContent dividers sx={{ border: 'none' }}>
      {children}
    </DialogContent>
    {actions && <DialogActions sx={{ px: 3, pb: 2 }}>{actions}</DialogActions>}
  </Dialog>
);

export default Modal;
