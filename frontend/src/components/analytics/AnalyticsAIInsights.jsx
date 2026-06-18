import React from 'react';
import { Paper, Typography, Box, Chip, Button } from '@mui/material';

import { FiCpu, FiAlertTriangle, FiArrowUpRight, FiZap, FiSettings } from 'react-icons/fi';
import { useSelector } from 'react-redux';

const AnalyticsAIInsights = () => {

  const { themeMode, appearance } = useSelector((state) => state.ui);
  const isDark = themeMode === 'dark';
  const isNeu = appearance?.neumorphism !== false;

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: '24px',
        backgroundColor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        mb: 4
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 1.2,
              borderRadius: '16px',
              background: isNeu ? 'transparent' : 'linear-gradient(135deg, #0EA5E9 0%, #A855F7 100%)',
              color: isNeu ? '#0EA5E9' : 'white',
              border: isNeu ? 'none' : '1px solid rgba(255,255,255,0.1)',
              boxShadow: isNeu ? (isDark ? 'inset 3px 3px 6px #0c0f16, inset -3px -3px 6px #1e2536' : 'inset 3px 3px 6px #d1d9e6, inset -3px -3px 6px #ffffff') : '0 8px 16px rgba(14, 165, 233, 0.25)',
            }}
          >
            <FiZap size={20} className="animate-pulse" />
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight="900" sx={{ letterSpacing: '-0.01em', color: 'text.primary' }}>
              Cognitive AI Analytics Insights
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight="700">
              Llama-3-Powered Real-time Pipeline Observations
            </Typography>
          </Box>
        </Box>
        <Chip
          label="AI AGENT RUNNING"
          size="small"
          sx={{
            fontWeight: 800,
            fontSize: '0.62rem',
            letterSpacing: '0.05em',
            bgcolor: 'rgba(59, 130, 246, 0.1)',
            color: '#3B82F6',
            borderRadius: '8px',
          }}
        />
      </Box>

      {/* 2x2 Grid using Tailwind */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recommendation 1 */}
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: '20px',
            bgcolor: isNeu ? 'transparent' : (isDark ? 'rgba(59, 130, 246, 0.04)' : 'rgba(59, 130, 246, 0.02)'),
            border: isNeu ? 'none' : '1.5px solid',
            borderColor: isNeu ? 'transparent' : 'rgba(59, 130, 246, 0.12)',
            boxShadow: isNeu ? (isDark ? 'inset 4px 4px 8px #0c0f16, inset -4px -4px 8px #1e2536' : 'inset 4px 4px 8px #d1d9e6, inset -4px -4px 8px #ffffff') : 'none',
            display: 'flex',
            gap: 2
          }}
        >
          <FiCpu size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
          <Box>
            <Typography variant="caption" fontWeight="800" color="primary.main" sx={{ display: 'block', mb: 0.5, letterSpacing: '0.05em' }}>
              REGIONAL DISPATCH OBSERVATION
            </Typography>
            <Typography variant="body2" color="text.primary" fontWeight="750" sx={{ fontSize: '0.78rem', lineHeight: 1.5 }}>
              "Telemetry stability increased by 8.4%. Asia-Pacific edge node ap-south-1 shows highest database ingestion velocity. Recommend auto-scaling regional read replicas."
            </Typography>
          </Box>
        </Paper>

        {/* Recommendation 2 */}
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: '20px',
            bgcolor: isNeu ? 'transparent' : (isDark ? 'rgba(168, 85, 247, 0.04)' : 'rgba(168, 85, 247, 0.02)'),
            border: isNeu ? 'none' : '1.5px solid',
            borderColor: isNeu ? 'transparent' : 'rgba(168, 85, 247, 0.12)',
            boxShadow: isNeu ? (isDark ? 'inset 4px 4px 8px #0c0f16, inset -4px -4px 8px #1e2536' : 'inset 4px 4px 8px #d1d9e6, inset -4px -4px 8px #ffffff') : 'none',
            display: 'flex',
            gap: 2
          }}
        >
          <FiAlertTriangle size={20} className="text-purple-500 flex-shrink-0 mt-0.5" />
          <Box>
            <Typography variant="caption" fontWeight="800" color="secondary.main" sx={{ display: 'block', mb: 0.5, letterSpacing: '0.05em' }}>
              INFLATION DEVIATION DETECTED
            </Typography>
            <Typography variant="body2" color="text.primary" fontWeight="750" sx={{ fontSize: '0.78rem', lineHeight: 1.5 }}>
              "Consumer Price Index (CPI) datasets for food indicators in Germany/Canada showed sudden 2.1% spikes. Ingestion cluster threshold alert triggered successfully."
            </Typography>
          </Box>
        </Paper>
      </div>

      {/* Footer Actions */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 2, borderTop: '1px solid', borderColor: 'divider', flexWrap: 'wrap', gap: 1.5 }}>
        <Typography variant="caption" color="text.secondary" fontWeight="700">
          Last processed: Just now | Pipeline Sync rate: 99.8% precision
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button size="small" variant="outlined" startIcon={<FiSettings />} sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 700, fontSize: '0.72rem' }}>
            Configure Triggers
          </Button>
          <Button size="small" variant="contained" endIcon={<FiArrowUpRight />} sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 700, fontSize: '0.72rem' }}>
            Deploy replicas
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default AnalyticsAIInsights;
