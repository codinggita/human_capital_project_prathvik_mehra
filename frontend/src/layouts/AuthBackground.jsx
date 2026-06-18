import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

const AuthBackground = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: 'url(/auth-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        p: { xs: 1.5, sm: 2, md: 3 },
      }}
    >
      {/* Full dark overlay */}
      <Box
        sx={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(4,8,25,0.93) 0%, rgba(8,15,50,0.88) 100%)',
          zIndex: 0,
        }}
      />

      {/* Glow orb — blue */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.38, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', width: 550, height: 550, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.38) 0%, transparent 70%)',
          top: -160, left: -120, zIndex: 0, pointerEvents: 'none',
        }}
      />
      {/* Glow orb — purple */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.12, 0.28, 0.12] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        style={{
          position: 'absolute', width: 450, height: 450, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.32) 0%, transparent 70%)',
          bottom: -80, right: -60, zIndex: 0, pointerEvents: 'none',
        }}
      />
      {children}
    </Box>
  );
};

export default AuthBackground;
