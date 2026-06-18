import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiCpu, FiGlobe, FiTrendingUp, FiActivity, FiAward } from 'react-icons/fi';

const TypingText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [text]);

  return <Typography variant="body2" sx={{ fontFamily: 'monospace', color: '#4ade80', lineHeight: 1.6 }}>{displayedText}</Typography>;
};

const CountryOverviewTab = ({ stats, liveTelemetryCount }) => {
  const { themeMode } = useSelector((state) => state.ui);
  const isDark = themeMode === 'dark';

  const terminalBg = isDark ? 'rgba(10, 15, 25, 0.85)' : 'rgba(20, 25, 35, 0.9)';
  
  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" fontWeight="900" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1, color: isDark ? '#c084fc' : '#9333ea' }}>
        <FiCpu size={24} /> AI Command Center
      </Typography>

      {/* Top: Floating KPI Orbs */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
        {[
          { title: 'Global Territories', value: stats.total, icon: <FiGlobe />, color: '#3b82f6' },
          { title: 'Average HC Index', value: `${stats.avgScore}%`, icon: <FiAward />, color: '#8b5cf6' },
          { title: 'Peak Performer', value: stats.highest.name, icon: <FiTrendingUp />, color: '#ec4899' },
          { title: 'Live Telemetries', value: liveTelemetryCount, icon: <FiActivity />, color: '#10b981' },
        ].map((kpi, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5, scale: 1.05 }}
            style={{ height: '100%' }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 3,
                height: '100%',
                borderRadius: '24px',
                bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid',
                borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.2)' : '0 10px 30px rgba(0,0,0,0.03)',
              }}
            >
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  bgcolor: `${kpi.color}20`,
                  color: kpi.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  mb: 2,
                  boxShadow: `0 0 20px ${kpi.color}40`,
                }}
              >
                {kpi.icon}
              </Box>
              <Typography variant="h5" fontWeight="900" sx={{ mb: 0.5, color: 'text.primary' }}>
                {kpi.value}
              </Typography>
              <Typography variant="caption" fontWeight="700" color="text.secondary">
                {kpi.title}
              </Typography>
            </Paper>
          </motion.div>
        ))}
      </Box>

      {/* Bottom: Terminal Output */}
      <Paper
        elevation={0}
        sx={{
          minHeight: 280,
          bgcolor: terminalBg,
          borderRadius: '24px',
          p: 4,
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'rgba(74, 222, 128, 0.2)',
          boxShadow: '0 0 40px rgba(74, 222, 128, 0.05)',
        }}
      >
        {/* Terminal Header */}
        <Box sx={{ display: 'flex', gap: 1, mb: 3, borderBottom: '1px solid rgba(255,255,255,0.1)', pb: 1 }}>
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ef4444' }} />
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#eab308' }} />
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#22c55e' }} />
          <Typography variant="caption" sx={{ ml: 2, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>
            system_core@hcp_analytics ~ live_feed
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="caption" sx={{ color: '#fb923c', fontFamily: 'monospace', mb: 0.5, display: 'block' }}>
              &gt; RUN: execute_growth_analysis()
            </Typography>
            <TypingText text="Analyzing APAC region... India leading with +4.2% HC growth rate. Detecting surge in active analytics indicators (+240 telemetry channels). Status: OPTIMAL." />
          </Box>
          
          <Box>
            <Typography variant="caption" sx={{ color: '#fb923c', fontFamily: 'monospace', mb: 0.5, display: 'block' }}>
              &gt; RUN: check_demographics(JP)
            </Typography>
            <TypingText text="Warning: Japan's HC index dipped to 88.7% (-0.4%). Suggesting immediate pivot to targeted workforce retraining programs in technical sectors. Status: CRITICAL." />
          </Box>

          <Box>
            <Typography variant="caption" sx={{ color: '#fb923c', fontFamily: 'monospace', mb: 0.5, display: 'block' }}>
              &gt; RUN: verify_stability_core(EU)
            </Typography>
            <TypingText text="Western Europe (DE, FR, UK) maintains average index of 89.6%. Low variance detected. High capital stability confirmed. Status: SECURE." />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default CountryOverviewTab;
