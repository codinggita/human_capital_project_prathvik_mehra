import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { FiLock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const TelemetryOfflineOverlay = ({ theme }) => {
  const navigate = useNavigate();

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: '24px',
        background: theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.45)' : 'rgba(255, 255, 255, 0.45)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        p: 4,
        zIndex: 10,
        border: '1px solid',
        borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
      }}
    >
      <Box
        sx={{
          width: 60,
          height: 60,
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #9c27b018, #9c27b033)',
          border: '1px solid rgba(156, 39, 176, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#9c27b0',
          fontSize: 24,
          mb: 3,
          boxShadow: '0 0 20px rgba(156, 39, 176, 0.15)',
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.05)' },
            '100%': { transform: 'scale(1)' }
          }
        }}
      >
        <FiLock />
      </Box>
      <Typography variant="h6" fontWeight="800" sx={{ mb: 1, color: 'text.primary', letterSpacing: '-0.01em' }}>
        Global Telemetry Offline
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, mb: 3.5, fontWeight: 500, lineHeight: 1.5 }}>
        Enable Telemetry Optimization in your Settings to resume real-time edge synchronization and diagnostic mapping.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate('/settings')}
        sx={{
          borderRadius: '12px',
          py: 1.2,
          px: 3,
          fontWeight: 800,
          background: 'linear-gradient(135deg, #9c27b0, #ba68c8)',
          boxShadow: '0 4px 15px rgba(156, 39, 176, 0.3)',
          color: '#fff',
          '&:hover': {
            background: 'linear-gradient(135deg, #7b1fa2, #9c27b0)',
            boxShadow: '0 6px 20px rgba(156, 39, 176, 0.4)',
          },
        }}
      >
        Configure AI Settings
      </Button>
    </Box>
  );
};

export default TelemetryOfflineOverlay;
