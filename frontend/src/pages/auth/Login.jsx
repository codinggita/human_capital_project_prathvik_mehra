import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { loginUser } from '../../features/authSlice';
import {
  Box,
  Typography,
  Paper,
  Alert,
  Link,
  Button,
} from '@mui/material';
import SEOMeta from '../../components/common/SEOMeta';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import LoginForm from '../../components/forms/LoginForm';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLoginSubmit = async (values) => {
    const resultAction = await dispatch(loginUser(values));
    if (loginUser.fulfilled.match(resultAction)) {
      toast.success('Successfully logged in!');
      navigate('/dashboard');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: 'spring' }}
    >
      <SEOMeta
        title="Sign In"
        description="Securely sign in to your Human Capital Analytics enterprise dashboard."
        path="/login"
      />

      <Paper elevation={0} sx={{ p: { xs: 1.5, md: 2.5 }, borderRadius: 4, width: '100%', maxWidth: '100%', bgcolor: 'transparent' }}>
        <Box sx={{ mb: 3.5, textAlign: 'center' }}>
          <Typography
            component="h1"
            variant="h4"
            fontWeight="bold"
            color="primary"
            sx={{ letterSpacing: '-0.04em' }}
            gutterBottom
          >
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to access your enterprise dashboard
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <LoginForm onSubmit={handleLoginSubmit} loading={loading} />

        {/* FAST LOGIN BUTTONS RESTORED */}
        <Box sx={{ display: 'flex', gap: 2, mt: 3, mb: 1 }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => handleLoginSubmit({ email: 'admin@hcproject.com', password: 'password123' })}
            disabled={loading}
            sx={{
              borderColor: '#fb923c', color: '#fb923c',
              '&:hover': { borderColor: '#ea580c', backgroundColor: 'rgba(251,146,60,0.1)' }
            }}
          >
            Admin Login
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => handleLoginSubmit({ email: 'guest@hcproject.com', password: 'password123' })}
            disabled={loading}
            sx={{
              borderColor: '#4ade80', color: '#4ade80',
              '&:hover': { borderColor: '#22c55e', backgroundColor: 'rgba(74,222,128,0.1)' }
            }}
          >
            Guest Login
          </Button>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Link
            component={RouterLink}
            to="/forgot-password"
            variant="body2"
            color="text.secondary"
            sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
          >
            Forgot password?
          </Link>
          <Link
            component={RouterLink}
            to="/register"
            variant="body2"
            color="primary"
            sx={{ fontWeight: 600, textDecoration: 'none' }}
          >
            Create Account
          </Link>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default Login;
