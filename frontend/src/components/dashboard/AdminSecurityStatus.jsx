import React from 'react';
import { Paper, Typography, Box, Grid, LinearProgress, useTheme } from '@mui/material';
import { FiShield, FiLock, FiCpu, FiHardDrive, FiActivity } from 'react-icons/fi';

const TELEMETRY = [
  { label: 'CPU Utilization', value: '14.2%', progress: 14.2, color: '#3B82F6' },
  { label: 'Memory Allocation', value: '42.8%', progress: 42.8, color: '#A855F7' },
  { label: 'DB Connections', value: '8 active', progress: 65, color: '#10B981' },
];

const SECURITY_CHECKS = [
  { name: 'JWT Encryption Scheme', val: 'HS256 (Secure)' },
  { name: 'CORS Headers Policies', val: 'Strict (Authorized origins)' },
  { name: 'Rate Limiter Window', val: '100 req / min' }
];

const AdminSecurityStatus = () => {
  const theme = useTheme();

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: '24px',
        height: '100%',
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.02)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 1.2,
              borderRadius: '16px',
              bgcolor: 'rgba(16, 185, 129, 0.1)',
              color: '#10B981',
            }}
          >
            <FiShield size={20} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="900" sx={{ letterSpacing: '-0.01em' }}>
              Admin Security Sentinel
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight="700">
              Active server telemetry and security headers monitor
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Main Grid */}
      <Grid container spacing={3.5} sx={{ flexGrow: 1 }}>
        {/* System Telemetry */}
        <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', gap: 2.2 }}>
          <Typography variant="subtitle2" color="text.secondary" fontWeight="800" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.72rem' }}>
            System Infrastructure Telemetry
          </Typography>

          {TELEMETRY.map((item, idx) => (
            <Box key={idx}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.8 }}>
                <Typography variant="body2" fontWeight="700" color="text.primary">
                  {item.label}
                </Typography>
                <Typography variant="caption" fontWeight="800" color="text.secondary">
                  {item.value}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={item.progress}
                sx={{
                  height: 6,
                  borderRadius: '3px',
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: '3px',
                    backgroundColor: item.color,
                  }
                }}
              />
            </Box>
          ))}
        </Grid>

        {/* Security Parameters */}
        <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <Typography variant="subtitle2" color="text.secondary" fontWeight="800" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.72rem' }}>
            API Rules & Cryptography
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {SECURITY_CHECKS.map((chk, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  p: 1.5,
                  borderRadius: '12px',
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.01)',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <FiLock size={16} style={{ color: '#10B981', flexShrink: 0 }} />
                <Box sx={{ overflow: 'hidden' }}>
                  <Typography variant="caption" color="text.secondary" fontWeight="700" sx={{ display: 'block', lineHeight: 1 }}>
                    {chk.name}
                  </Typography>
                  <Typography variant="body2" fontWeight="800" color="text.primary" sx={{ mt: 0.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {chk.val}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AdminSecurityStatus;
