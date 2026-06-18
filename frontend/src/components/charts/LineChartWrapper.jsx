import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Paper, Typography, Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const LineChartWrapper = ({ title, data, dataKeyX, dataKeyY, color }) => {
  const theme = useTheme();
  // Default to primary color (coral) if not provided
  const chartColor = color || theme.palette.primary.main;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
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
            <AreaChart data={data} margin={{ top: 10, right: 20, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColor} stopOpacity={theme.palette.mode === 'dark' ? 0.35 : 0.25} />
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
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
              />
              <Area
                type="monotone"
                dataKey={dataKeyY}
                stroke={chartColor}
                strokeWidth={4.5}
                fillOpacity={1}
                fill="url(#areaGradient)"
                dot={{ r: 0 }}
                activeDot={{
                  r: 8,
                  strokeWidth: 0,
                  fill: chartColor,
                  style: { filter: `drop-shadow(0px 4px 12px ${chartColor})` },
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default LineChartWrapper;
