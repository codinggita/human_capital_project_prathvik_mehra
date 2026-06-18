import React, { Component } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { FiAlertTriangle, FiRefreshCcw } from 'react-icons/fi';
import { motion } from 'framer-motion';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, errorInfo: error };
  }

  componentDidCatch(error, errorInfo) {
    // In an enterprise app, we would log this to Sentry or Datadog here
    console.error('ErrorBoundary caught a critical React error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            height: '100vh',
            width: '100vw',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            p: 3,
          }}
        >
          <Paper
            elevation={2}
            sx={{ p: { xs: 4, md: 6 }, borderRadius: 4, textAlign: 'center', maxWidth: 600 }}
          >
            <motion.div
              animate={{ rotate: [-5, 5, -5, 5, 0] }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              style={{
                marginBottom: '24px',
                color: '#FF6B35',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <FiAlertTriangle size={80} />
            </motion.div>
            <Typography variant="h4" color="error" fontWeight="bold" gutterBottom>
              Critical System Failure
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              An unexpected UI error crashed the interface. Please reload the dashboard to restore
              full functionality.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<FiRefreshCcw />}
              onClick={this.handleReload}
              sx={{ borderRadius: 3, fontWeight: 'bold', px: 4, py: 1.5 }}
            >
              Reload Dashboard
            </Button>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
