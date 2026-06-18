import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const Loader = ({ message = 'Initializing System...', fullScreen = false }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: fullScreen ? '100vh' : '100%',
        minHeight: fullScreen ? '100vh' : '300px',
        width: '100%',
        backgroundColor: fullScreen ? 'background.default' : 'transparent',
      }}
    >
      <Box sx={{ position: 'relative', width: 100, height: 100, mb: 4 }}>
        {/* Infinity Orb 1 */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            x: [0, 20, 0, -20, 0],
            y: [0, -20, 0, 20, 0],
          }}
          transition={{
            duration: 4,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 60,
            height: 60,
            marginLeft: -30,
            marginTop: -30,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.8), rgba(245, 158, 11, 0.4))',
            filter: 'blur(8px)',
            mixBlendMode: 'screen',
          }}
        />
        {/* Infinity Orb 2 */}
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            x: [0, -20, 0, 20, 0],
            y: [0, 20, 0, -20, 0],
          }}
          transition={{
            duration: 4,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 60,
            height: 60,
            marginLeft: -30,
            marginTop: -30,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.8), rgba(16, 185, 129, 0.4))',
            filter: 'blur(8px)',
            mixBlendMode: 'screen',
          }}
        />
        {/* Center Sparkle */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 12,
            height: 12,
            marginLeft: -6,
            marginTop: -6,
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            boxShadow: '0 0 20px rgba(255,255,255,0.8)',
            zIndex: 10,
          }}
        />
      </Box>

      <Typography
        variant="h6"
        color="text.secondary"
        sx={{
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          fontSize: '0.85rem',
        }}
      >
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          {message}
        </motion.span>
      </Typography>
    </Box>
  );
};

export default Loader;
