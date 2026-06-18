import React from 'react';
import { Paper, Typography, Box, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { FiServer, FiCpu, FiWifi } from 'react-icons/fi';

const SystemHealthWidget = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.01, translateY: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 3,
          borderRadius: '24px',
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.02)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" fontWeight="800" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            System Health Metrics
          </Typography>
          <Box sx={{ bgcolor: 'rgba(59, 130, 246, 0.1)', p: 1, borderRadius: '12px', display: 'flex', alignItems: 'center' }}>
            <FiServer size={20} color="#3b82f6" />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* MongoDB Latency */}
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" fontWeight="700">MongoDB Latency</Typography>
              <Typography variant="body2" color="success.main" fontWeight="800">12 ms</Typography>
            </Box>
            <LinearProgress variant="determinate" value={15} color="success" sx={{ height: 6, borderRadius: 3 }} />
          </Box>

          {/* API Success Rate */}
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" fontWeight="700">API Success Rate</Typography>
              <Typography variant="body2" color="primary.main" fontWeight="800">99.8%</Typography>
            </Box>
            <LinearProgress variant="determinate" value={99.8} color="primary" sx={{ height: 6, borderRadius: 3 }} />
          </Box>

          {/* Server Load */}
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" fontWeight="700">Compute Load</Typography>
              <Typography variant="body2" color="warning.main" fontWeight="800">42%</Typography>
            </Box>
            <LinearProgress variant="determinate" value={42} color="warning" sx={{ height: 6, borderRadius: 3 }} />
          </Box>
        </Box>

        <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid rgba(150,150,150,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FiWifi size={14} color="#22c55e" />
            <Typography variant="caption" color="text.secondary" fontWeight="600">All Systems Operational</Typography>
          </Box>
          <Typography variant="caption" color="text.secondary" fontWeight="500">Updated just now</Typography>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default SystemHealthWidget;
