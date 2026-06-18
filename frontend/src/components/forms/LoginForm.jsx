import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/material';
import Input from '../ui/Input';
import Button from '../ui/Button';

const validationSchema = Yup.object({
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password should be at least 6 characters')
    .required('Password is required'),
});

const LoginForm = ({ onSubmit, loading }) => {
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>

      <Box sx={{ mb: 2.5 }}>
        <Input
          fullWidth
          size="small"
          id="email"
          name="email"
          label="Email Address"
          autoComplete="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </Box>
      <Box sx={{ mb: 3 }}>
        <Input
          fullWidth
          size="small"
          id="password"
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
      </Box>

      <Button
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
        loading={loading}
        sx={{ py: 1.35, fontSize: '1rem' }}
      >
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
