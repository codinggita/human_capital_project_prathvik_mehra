import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiRadio } from 'react-icons/fi';

const DynamicRadar = ({ isDark }) => {
  return (
    <Box sx={{ position: 'relative', width: '100%', height: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {/* Background Rings */}
      {[1, 2, 3, 4].map((ring) => (
        <Box
          key={ring}
          sx={{
            position: 'absolute',
            width: ring * 25 + '%',
            height: ring * 25 + '%',
            borderRadius: '50%',
            border: `1px solid ${isDark ? 'rgba(74, 222, 128, 0.2)' : 'rgba(74, 222, 128, 0.4)'}`,
            boxShadow: `0 0 20px ${isDark ? 'rgba(74, 222, 128, 0.05)' : 'rgba(74, 222, 128, 0.1)'}`,
          }}
        />
      ))}

      {/* Sweeping Scanner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute',
          width: '50%',
          height: '50%',
          top: 0,
          left: '50%',
          transformOrigin: 'bottom left',
          background: `conic-gradient(from 180deg at 0% 100%, transparent 0deg, ${isDark ? 'rgba(74,222,128,0.4)' : 'rgba(74,222,128,0.6)'} 90deg, transparent 90deg)`,
        }}
      />

      {/* Nodes */}
      {[
        { top: '30%', left: '30%', color: '#ef4444' },
        { top: '20%', left: '70%', color: '#3b82f6' },
        { top: '60%', left: '80%', color: '#f59e0b' },
        { top: '70%', left: '40%', color: '#8b5cf6' },
        { top: '50%', left: '50%', color: '#10b981' },
      ].map((node, i) => (
        <Box key={i} sx={{ position: 'absolute', top: node.top, left: node.left }}>
          <motion.div
            animate={{ scale: [1, 2.5, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            style={{ position: 'absolute', width: 12, height: 12, borderRadius: '50%', backgroundColor: node.color, transform: 'translate(-50%, -50%)' }}
          />
          <Box sx={{ position: 'absolute', width: 12, height: 12, borderRadius: '50%', backgroundColor: node.color, transform: 'translate(-50%, -50%)', boxShadow: `0 0 15px ${node.color}` }} />
        </Box>
      ))}

      <Box sx={{ position: 'absolute', bottom: 20, left: 20, zIndex: 10 }}>
        <Typography variant="overline" sx={{ color: '#4ade80', fontWeight: 'bold', letterSpacing: 2 }}>
          SCANNING FOR ANOMALIES...
        </Typography>
      </Box>
    </Box>
  );
};

const CountryHeatmapTab = () => {
  const { themeMode } = useSelector((state) => state.ui);
  const isDark = themeMode === 'dark';

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" fontWeight="900" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1, color: isDark ? '#c084fc' : '#9333ea' }}>
        <FiRadio size={24} /> Radar Surveillance Console
      </Typography>
      <Paper
        elevation={0}
        sx={{
          borderRadius: '24px',
          bgcolor: isDark ? 'rgba(10, 15, 25, 0.9)' : 'rgba(240, 245, 240, 0.9)',
          border: '1px solid',
          borderColor: isDark ? 'rgba(74, 222, 128, 0.2)' : 'rgba(74, 222, 128, 0.3)',
          overflow: 'hidden',
          boxShadow: isDark ? 'inset 0 0 60px rgba(74, 222, 128, 0.05)' : 'inset 0 0 60px rgba(74, 222, 128, 0.1)',
        }}
      >
        <DynamicRadar isDark={isDark} />
      </Paper>
    </Box>
  );
};

export default CountryHeatmapTab;
