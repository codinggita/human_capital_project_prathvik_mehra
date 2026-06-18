import React from 'react';
import { Box, Typography, LinearProgress, Paper, useTheme } from '@mui/material';
import { FiLock, FiDatabase, FiServer, FiGitCommit, FiCpu } from 'react-icons/fi';

const INFRA_TELEMETRY = [
  { label: 'CPU Utilization', value: '14.2%', progress: 14.2, color: '#3B82F6' },
  { label: 'Memory Allocation', value: '42.8%', progress: 42.8, color: '#A855F7' },
  { label: 'DB Connections', value: '8 active', progress: 65, color: '#10B981' },
];

const SECURITY_CHECKS = [
  { name: 'JWT Encryption Scheme', val: 'HS256 (Secure)' },
  { name: 'CORS Headers Policies', val: 'Strict (Authorized origins)' },
];

const STATUS_NODES = [
  { name: 'API Router', health: '99.9%', icon: FiServer, color: '#10B981' },
  { name: 'Mongo DB', health: '3 synced', icon: FiDatabase, color: '#10B981' },
  { name: 'Cache Layer', health: 'Active', icon: FiGitCommit, color: '#00E5FF' },
  { name: 'Aggregator', health: 'Active', icon: FiCpu, color: '#A855F7' }
];

const TelemetryStatusPanel = () => {
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
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        justifyContent: 'space-between',
        minHeight: 200
      }}
    >
      {/* 4 Database status nodes */}
      <div className="grid grid-cols-2 gap-2">
        {STATUS_NODES.map((item, index) => {
          const Icon = item.icon;
          return (
            <Paper
              key={index}
              elevation={0}
              sx={{
                p: 1,
                borderRadius: '12px',
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.015)' : 'rgba(255,255,255,0.6)',
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Box sx={{ p: 0.6, borderRadius: '8px', bgcolor: `${item.color}15`, color: item.color, display: 'flex' }}>
                <Icon size={12} />
              </Box>
              <Box sx={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="caption" fontWeight="800" noWrap sx={{ fontSize: '0.62rem', color: 'text.primary' }}>
                  {item.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.55rem', fontWeight: 600 }}>
                  {item.health}
                </Typography>
              </Box>
              <Box sx={{ position: 'absolute', top: 5, right: 5, width: 5, height: 5, borderRadius: '50%', bgcolor: item.color }} />
            </Paper>
          );
        })}
      </div>

      {/* Infrastructure Metrics */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
        {INFRA_TELEMETRY.map((item, idx) => (
          <Box key={idx} sx={{ display: 'flex', flexDirection: 'column', gap: 0.4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="caption" color="text.secondary" fontWeight="700" sx={{ fontSize: '0.62rem' }}>
                {item.label}
              </Typography>
              <Typography variant="caption" color="text.primary" fontWeight="800" sx={{ fontSize: '0.62rem' }}>
                {item.value}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={item.progress}
              sx={{
                height: 4,
                borderRadius: '2px',
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                '& .MuiLinearProgress-bar': {
                  bgcolor: item.color,
                  borderRadius: '2px',
                }
              }}
            />
          </Box>
        ))}
      </Box>

      {/* Security Policies */}
      <div className="flex gap-2">
        {SECURITY_CHECKS.map((chk, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: 1,
              borderRadius: '10px',
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.015)' : 'rgba(255,255,255,0.6)',
              border: '1px solid',
              borderColor: 'divider',
              flex: 1,
              minWidth: 0
            }}
          >
            <FiLock size={11} className="text-emerald-500 flex-shrink-0" />
            <Box sx={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="caption" color="text.secondary" fontWeight="700" sx={{ fontSize: '0.52rem', lineHeight: 1, noWrap: true }}>
                {chk.name}
              </Typography>
              <Typography variant="caption" color="text.primary" fontWeight="800" sx={{ fontSize: '0.58rem', mt: 0.2, noWrap: true }}>
                {chk.val}
              </Typography>
            </Box>
          </Paper>
        ))}
      </div>
    </Paper>
  );
};

export default TelemetryStatusPanel;
