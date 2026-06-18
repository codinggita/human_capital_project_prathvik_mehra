import React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Paper, Link, Typography } from '@mui/material';
import SEOMeta from '../../components/common/SEOMeta';
import { motion } from 'framer-motion';
import ForgotPasswordForm from '../../components/forms/ForgotPasswordForm';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    // Redirect to login after successful reset
    navigate('/login');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: 'spring' }}
    >
      <SEOMeta
        title="Reset Password"
        description="Recover and reset your Human Capital Analytics enterprise password."
        path="/forgot-password"
      />

      <Paper elevation={0} sx={{ p: { xs: 1.5, md: 2.5 }, borderRadius: 4, width: '100%', maxWidth: '100%', bgcolor: 'transparent' }}>
        <Box sx={{ mb: 3.2, textAlign: 'center' }}>
          <Typography
            component="h1"
            variant="h4"
            fontWeight="bold"
            color="primary"
            sx={{ letterSpacing: '-0.04em' }}
            gutterBottom
          >
            Password Recovery
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Retrieve access to your enterprise dashboard
          </Typography>
        </Box>

        <ForgotPasswordForm onSuccess={handleSuccess} />

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Link
            component={RouterLink}
            to="/login"
            variant="body2"
            color="primary"
            sx={{ fontWeight: 600, textDecoration: 'none' }}
          >
            Back to Sign In
          </Link>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default ForgotPassword;
