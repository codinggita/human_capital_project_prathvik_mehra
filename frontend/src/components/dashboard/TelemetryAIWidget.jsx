import React from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import { FiCpu, FiAlertTriangle, FiArrowUpRight } from 'react-icons/fi';

const TelemetryAIWidget = () => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: '20px',
        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.01)',
        border: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        justifyContent: 'space-between',
        minHeight: 160
      }}
    >
      {/* AI Summary Recommendation Box */}
      <Paper
        elevation={0}
        sx={{
          p: 1.5,
          borderRadius: '16px',
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.05)' : 'rgba(59, 130, 246, 0.03)',
          border: '1.5px solid',
          borderColor: 'rgba(59, 130, 246, 0.15)',
          display: 'flex',
          gap: 1.5,
          flexGrow: 1
        }}
      >
        <Box sx={{ color: 'primary.main', mt: 0.2 }}>
          <FiCpu size={16} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="caption" fontWeight="800" color="primary.main" sx={{ display: 'block', mb: 0.5 }}>
            COGNITIVE AI DISPATCH
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight="700" sx={{ fontSize: '0.68rem', lineHeight: 1.4 }}>
            "Telemetry stability increased 8%. Asia region is showing highest indicators activity. Pipeline latency optimized successfully."
          </Typography>
        </Box>
      </Paper>

      {/* Floating Mini Intelligence Alerts */}
      <div className="flex gap-2">
        <Paper
          elevation={0}
          sx={{
            p: 1,
            borderRadius: '12px',
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.015)' : 'rgba(255,255,255,0.6)',
            border: '1px solid',
            borderColor: 'divider',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minWidth: 0
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="caption" color="text.secondary" fontWeight="700" sx={{ fontSize: '0.55rem' }}>
              Top Growth Region
            </Typography>
            <Typography variant="body2" fontWeight="950" color="text.primary" sx={{ mt: 0.2, fontSize: '0.68rem' }}>
              India (+3.4%)
            </Typography>
          </Box>
          <FiArrowUpRight size={14} className="text-emerald-500 flex-shrink-0" />
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 1,
            borderRadius: '12px',
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(239, 68, 68, 0.05)' : 'rgba(239, 68, 68, 0.02)',
            border: '1px solid',
            borderColor: 'rgba(239, 68, 68, 0.15)',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minWidth: 0
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="caption" color="error.main" fontWeight="700" sx={{ fontSize: '0.55rem' }}>
              Inflation Alert
            </Typography>
            <Typography variant="body2" fontWeight="950" color="error.main" sx={{ mt: 0.2, fontSize: '0.68rem' }}>
              Canada (+2.1%)
            </Typography>
          </Box>
          <FiAlertTriangle size={14} className="text-red-500 flex-shrink-0" />
        </Paper>
      </div>
    </Paper>
  );
};

export default TelemetryAIWidget;
