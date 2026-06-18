import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const PremiumChartsTooltip = ({ active, payload, label, theme }) => {
  if (active && payload && payload.length) {
    return (
      <Paper
        elevation={6}
        sx={{
          p: 2,
          borderRadius: '16px',
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          border: '1px solid',
          borderColor: 'divider',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="caption" fontWeight="800" color="text.secondary" sx={{ display: 'block', mb: 1, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {label} Snapshot
        </Typography>
        {payload.map((item, idx) => (
          <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: item.color }} />
            <Typography variant="body2" fontWeight="700" color="text.primary">
              {item.name}:
            </Typography>
            <Typography variant="body2" fontWeight="800" sx={{ color: item.color, ml: 'auto' }}>
              {item.value} {item.name === 'HCI' ? '' : item.name === 'Growth' ? '%' : ''}
            </Typography>
          </Box>
        ))}
      </Paper>
    );
  }
  return null;
};

export default PremiumChartsTooltip;
