/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { Box, Paper, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

// Helper for neumorphic style mappings based on mode
export const getNeumorphicStyles = (isDark) => {
  const bg = isDark ? '#151A26' : '#E6ECF5';
  const shadow = isDark
    ? '9px 9px 18px #0c0f16, -9px -9px 18px #1e2536'
    : '8px 8px 16px #b8c1cf, -8px -8px 16px #ffffff';
  const innerShadow = isDark
    ? 'inset 2px 2px 5px #080c16, inset -2px -2px 5px #16223e'
    : 'inset 2px 2px 5px #d1d9e6, inset -2px -2px 5px #ffffff';

  return { bg, shadow, innerShadow };
};

export const SkeletonShimmer = ({ className = '', variant = 'rectangular', width, height, sx = {}, ...props }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  const baseBg = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)';
  const highlightGrad = isDark 
    ? 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent)' 
    : 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)';

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: baseBg,
        borderRadius: variant === 'circular' ? '50%' : '12px',
        width: width || '100%',
        height: height || '20px',
        ...sx,
      }}
      className={className}
      {...props}
    >
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: highlightGrad,
        }}
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          repeat: Infinity,
          duration: 1.6,
          ease: 'easeInOut',
        }}
      />
    </Box>
  );
};

export const PremiumCardShell = ({ children, className = '', sx = {}, ...props }) => {
  const { themeMode } = useSelector((state) => state.ui);
  const isDark = themeMode === 'dark';
  const styles = getNeumorphicStyles(isDark);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: '24px',
        boxShadow: styles.shadow,
        backgroundColor: styles.bg,
        border: '1px solid',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        ...sx,
      }}
      className={className}
      {...props}
    >
      {children}
    </Paper>
  );
};
