import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, Badge, IconButton, useTheme } from '@mui/material';
import { FiTerminal, FiPlay, FiPause, FiActivity } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_ROUTES = [
  { method: 'GET', url: '/api/v1/stats/overview', status: 200, size: '2.4 kB' },
  { method: 'GET', url: '/api/v1/stats/prices', status: 200, size: '4.8 kB' },
  { method: 'GET', url: '/api/v1/stats/top-countries', status: 200, size: '1.2 kB' },
  { method: 'GET', url: '/api/v1/stats/highest-value', status: 200, size: '640 B' },
  { method: 'GET', url: '/api/v1/stats/lowest-value', status: 200, size: '640 B' },
  { method: 'POST', url: '/api/v1/stats/aggregate', status: 201, size: '120 B' },
  { method: 'PUT', url: '/api/v1/users/profile', status: 200, size: '1.8 kB' },
  { method: 'GET', url: '/api/v1/countries/list', status: 200, size: '12 kB' }
];

const LiveActivityMonitor = () => {
  const theme = useTheme();
  const [logs, setLogs] = useState(() => {
    return Array.from({ length: 5 }).map((_, idx) => {
      const route = MOCK_ROUTES[Math.floor(Math.random() * MOCK_ROUTES.length)];
      const latency = Math.floor(Math.random() * 35) + 5;
      const timestamp = new Date(Date.now() - (5 - idx) * 3000).toLocaleTimeString();
      return { id: idx, ...route, latency, timestamp };
    });
  });
  const [isLive, setIsLive] = useState(true);
  // Periodic log adding
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setLogs((prevLogs) => {
        const route = MOCK_ROUTES[Math.floor(Math.random() * MOCK_ROUTES.length)];
        const latency = Math.floor(Math.random() * 40) + 4;
        const timestamp = new Date().toLocaleTimeString();
        const nextId = prevLogs.length > 0 ? Math.max(...prevLogs.map((l) => l.id)) + 1 : 0;
        const updated = [...prevLogs, { id: nextId, ...route, latency, timestamp }];
        // Keep last 15 logs
        return updated.slice(-15);
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [isLive]);



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
        minHeight: 400,
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 1.2,
              borderRadius: '16px',
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.02)',
              color: 'text.primary',
            }}
          >
            <FiTerminal size={20} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="900" sx={{ letterSpacing: '-0.01em' }}>
              Real-time API Monitor
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight="700">
              MongoDB network and router activity stream
            </Typography>
          </Box>
        </Box>

        {/* Live Controller Button */}
        <IconButton
          size="small"
          onClick={() => setIsLive(!isLive)}
          sx={{
            bgcolor: isLive ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            color: isLive ? '#22C55E' : '#EF4444',
            '&:hover': {
              bgcolor: isLive ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
            },
            borderRadius: '12px',
            p: 1
          }}
        >
          {isLive ? <FiPause size={16} /> : <FiPlay size={16} />}
        </IconButton>
      </Box>

      {/* Terminal View */}
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: theme.palette.mode === 'dark' ? '#090d16' : '#f8fafc',
          borderRadius: '18px',
          p: 2,
          fontFamily: 'monospace',
          fontSize: '0.72rem',
          overflowY: 'auto',
          maxHeight: 280,
          border: '1px solid',
          borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.04)',
          boxShadow: theme.palette.mode === 'dark' ? 'inset 0 2px 8px rgba(0,0,0,0.8)' : 'inset 0 2px 6px rgba(0,0,0,0.05)',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <AnimatePresence initial={false}>
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    color: theme.palette.mode === 'dark' ? '#94a3b8' : '#64748b',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Typography variant="caption" sx={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600 }}>
                    [{log.timestamp}]
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      px: 0.8,
                      py: 0.2,
                      borderRadius: '4px',
                      bgcolor: log.method === 'POST' ? 'rgba(168, 85, 247, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                      color: log.method === 'POST' ? '#A855F7' : '#3B82F6',
                    }}
                  >
                    {log.method}
                  </Typography>
                  <Typography variant="caption" sx={{ fontSize: '0.68rem', fontWeight: 700, color: theme.palette.mode === 'dark' ? '#f1f5f9' : '#1e293b', flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {log.url}
                  </Typography>
                  <Typography variant="caption" sx={{ fontSize: '0.68rem', fontWeight: 800, color: '#22C55E' }}>
                    {log.status}
                  </Typography>
                  <Typography variant="caption" sx={{ fontSize: '0.68rem', fontWeight: 700, color: '#FF6B35' }}>
                    {log.latency}ms
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </AnimatePresence>
        </Box>
      </Box>

      {/* Footer Metrics */}
      <Box
        sx={{
          mt: 2,
          pt: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 2,
          textAlign: 'center',
        }}
      >
        <Box>
          <Typography variant="caption" color="text.secondary" fontWeight="700">
            Avg Latency
          </Typography>
          <Typography variant="body2" fontWeight="800" color="primary.main" sx={{ mt: 0.5 }}>
            12 ms
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary" fontWeight="700">
            Success Rate
          </Typography>
          <Typography variant="body2" fontWeight="800" color="success.main" sx={{ mt: 0.5 }}>
            100.0%
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary" fontWeight="700">
            Live Stream
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.6, mt: 0.5 }}>
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: isLive ? '#22C55E' : '#EF4444',
                animation: isLive ? 'pulse 1.5s infinite' : 'none',
              }}
            />
            <Typography variant="body2" fontWeight="800" color={isLive ? 'success.main' : 'error.main'}>
              {isLive ? 'Active' : 'Paused'}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default LiveActivityMonitor;
