import React from 'react';
import { Button as MuiButton, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

const Button = ({
  children,
  loading,
  variant = 'contained',
  color = 'primary',
  onClick,
  type = 'button',
  fullWidth,
  sx,
  ...props
}) => (
  <motion.div whileTap={{ scale: 0.97 }}>
    <MuiButton
      type={type}
      variant={variant}
      color={color}
      onClick={onClick}
      fullWidth={fullWidth}
      disabled={loading || props.disabled}
      sx={{
        borderRadius: 3,
        py: 1.2,
        fontWeight: 600,
        ...sx,
      }}
      {...props}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : children}
    </MuiButton>
  </motion.div>
);

export default Button;
