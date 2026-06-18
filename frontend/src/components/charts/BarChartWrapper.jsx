import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';
import { Paper, Typography, Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const BarChartWrapper = ({ title, data, dataKeyX, dataKeyY, color }) => {
  const theme = useTheme();
  const chartColor = color || theme.palette.secondary.main;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
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
        <Box sx={{ width: '100%', height: 320, mt: 3 }}>
          <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 10, right: 20, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chartColor} stopOpacity={1} />
                  <stop offset="100%" stopColor={chartColor} stopOpacity={0.25} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke={
                  theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.04)'
                }
              />
              <XAxis
                dataKey={dataKeyX}
                axisLine={false}
                tickLine={false}
                tick={{ fill: theme.palette.text.secondary, fontSize: 11, fontWeight: 600 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: theme.palette.text.secondary, fontSize: 11, fontWeight: 600 }}
                dx={-10}
              />
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
                cursor={{ fill: 'rgba(255,255,255,0.10)' }}
              />
              <Bar dataKey={dataKeyY} radius={[12, 12, 0, 0]} fill="url(#barGradient)">
                {(data || []).map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill="url(#barGradient)"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default BarChartWrapper;
