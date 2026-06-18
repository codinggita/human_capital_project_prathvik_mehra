import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Paper, Typography, Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const COLORS = ['#FF6038', '#00E5FF', '#A855F7', '#10B981', '#FF6B35'];

const DonutChartWrapper = ({ title, data, dataKeyName, dataKeyValue }) => {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Paper
        elevation={2}
        sx={{
          p: { xs: 2.5, md: 4 },
          borderRadius: '24px',
          height: '100%',
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.02)',
        }}
      >
        <Typography variant="h6" fontWeight="800" sx={{ letterSpacing: '-0.01em' }}>
          {title}
        </Typography>
        <Box sx={{ width: '100%', height: 320, mt: 1 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={100}
                paddingAngle={4}
                dataKey={dataKeyValue}
                nameKey={dataKeyName}
              >
                {(data || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: '16px',
                  border: theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '8px 8px 16px #0c0f16, -8px -8px 16px #1e2536'
                    : theme.shadows[4],
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  padding: '12px',
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: 600 }}
                formatter={(value) => (
                  <span style={{ color: theme.palette.text.secondary }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default DonutChartWrapper;
