import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        bgcolor: '#f4f6f8',
      }}
    >
      <Helmet>
        <title>404 Not Found | Human Capital Analytics</title>
      </Helmet>
      <Typography variant="h1" color="primary" fontWeight="bold">
        404
      </Typography>
      <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
        Oops! The page you are looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate('/dashboard')}
        sx={{ textTransform: 'none' }}
      >
        Return to Dashboard
      </Button>
    </Box>
  );
};

export default NotFound;
