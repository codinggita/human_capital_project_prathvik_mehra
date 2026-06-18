import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { FiAlertTriangle, FiRefreshCcw } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ErrorState = ({ error, onRetry }) => (
  <Paper
    elevation={2}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      py: 8,
      px: 2,
      textAlign: 'center',
      borderRadius: 4,
      mt: 2,
    }}
  >
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      style={{ marginBottom: '24px', color: '#FF6B35' }}
    >
      <FiAlertTriangle size={64} />
    </motion.div>
    <Typography variant="h5" color="error" fontWeight="bold" gutterBottom>
      API Connection Failed
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500 }}>
      {typeof error === 'string'
        ? error
        : 'The server encountered an unexpected error while trying to fetch the data. Please check your backend connection.'}
    </Typography>
    {onRetry && (
      <Button
        variant="outlined"
        color="primary"
        startIcon={<FiRefreshCcw />}
        onClick={onRetry}
        sx={{ borderRadius: 3, fontWeight: 'bold', px: 4, py: 1 }}
      >
        Retry Connection
      </Button>
    )}
  </Paper>
);

export default ErrorState;
