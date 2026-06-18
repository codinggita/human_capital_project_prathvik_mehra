import React from 'react';
import { TextField, useTheme, Box } from '@mui/material';

const Input = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  type = 'text',
  fullWidth = true,
  ...props
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const inputShadow = isDark
    ? 'inset 2px 2px 5px #080c16, inset -2px -2px 5px #16223e'
    : 'inset 2px 2px 5px #d1d9e6, inset -2px -2px 5px #ffffff';

  return (
    <Box sx={{ width: fullWidth ? '100%' : 'auto' }}>
      <TextField
        fullWidth={fullWidth}
        label={label}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        helperText={helperText}
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
            boxShadow: inputShadow,
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
          },
        }}
        {...props}
      />
    </Box>
  );
};

export default Input;
