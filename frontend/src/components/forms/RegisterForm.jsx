import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/material';
import Input from '../ui/Input';
import Button from '../ui/Button';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const RegisterForm = ({ onSubmit, loading }) => {
  const formik = useFormik({
    initialValues: { name: '', email: '', password: '', passwordConfirm: '' },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.2, mb: 3.2 }}>
        <Input
          fullWidth
          size="small"
          id="name"
          name="name"
          label="Full Name"
          autoComplete="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
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
        <Input
          fullWidth
          size="small"
          id="password"
          name="password"
          label="Password"
          type="password"
          autoComplete="new-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Input
          fullWidth
          size="small"
          id="passwordConfirm"
          name="passwordConfirm"
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          value={formik.values.passwordConfirm}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.passwordConfirm && Boolean(formik.errors.passwordConfirm)}
          helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
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
        Create Account
      </Button>
    </form>
  );
};

export default RegisterForm;
