import React, { useState } from 'react';
import { Paper, Typography, Box, Button, useTheme } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FiLayers } from 'react-icons/fi';
import PremiumChartsTooltip from './PremiumChartsTooltip';

const TIMEFRAMES = ['7D', '30D', '1Y', 'ALL'];

const DATA_SET = {
  '7D': [
    { name: 'Mon', CPI: 139.1, HCI: 0.72, Growth: 2.1 },
    { name: 'Tue', CPI: 139.3, HCI: 0.72, Growth: 2.2 },
    { name: 'Wed', CPI: 139.6, HCI: 0.73, Growth: 2.4 },
    { name: 'Thu', CPI: 139.4, HCI: 0.73, Growth: 2.3 },
    { name: 'Fri', CPI: 139.9, HCI: 0.74, Growth: 2.5 },
    { name: 'Sat', CPI: 140.2, HCI: 0.74, Growth: 2.7 },
    { name: 'Sun', CPI: 140.5, HCI: 0.74, Growth: 2.8 },
  ],
  '30D': [
    { name: 'Week 1', CPI: 138.2, HCI: 0.70, Growth: 1.9 },
    { name: 'Week 2', CPI: 139.5, HCI: 0.72, Growth: 2.2 },
    { name: 'Week 3', CPI: 140.1, HCI: 0.73, Growth: 2.6 },
    { name: 'Week 4', CPI: 141.8, HCI: 0.74, Growth: 2.9 },
  ],
  '1Y': [
    { name: 'Jan', CPI: 132.4, HCI: 0.68, Growth: 1.2 },
    { name: 'Mar', CPI: 134.8, HCI: 0.69, Growth: 1.5 },
    { name: 'May', CPI: 136.2, HCI: 0.71, Growth: 1.8 },
    { name: 'Jul', CPI: 138.9, HCI: 0.72, Growth: 2.1 },
    { name: 'Sep', CPI: 140.5, HCI: 0.73, Growth: 2.4 },
    { name: 'Nov', CPI: 142.7, HCI: 0.74, Growth: 2.8 },
  ],
  'ALL': [
    { name: '2022', CPI: 110.5, HCI: 0.65, Growth: -1.0 },
    { name: '2023', CPI: 121.2, HCI: 0.68, Growth: 0.8 },
    { name: '2024', CPI: 130.4, HCI: 0.71, Growth: 1.9 },
    { name: '2025', CPI: 138.1, HCI: 0.73, Growth: 2.4 },
    { name: '2026', CPI: 142.7, HCI: 0.74, Growth: 2.8 },
  ]
};

// Tooltip imported from PremiumChartsTooltip

const PremiumChartsPanel = ({ serverData }) => {
  const theme = useTheme();
  const [timeframe, setTimeframe] = useState('ALL');
  const [metric, setMetric] = useState('CPI'); // 'CPI' | 'HCI' | 'Growth'

  // Map server trend data if available and timeframe is ALL
  const trendData = serverData && timeframe === 'ALL'
    ? serverData.map(item => ({ name: item.name, CPI: item.value, HCI: 0.74, Growth: 2.8 }))
    : DATA_SET[timeframe];

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
        minHeight: 460,
      }}
    >
      {/* Header section with title and timeframe filters */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 1.2,
              borderRadius: '16px',
              bgcolor: 'rgba(255, 96, 56, 0.1)',
              color: '#FF6038',
            }}
          >
            <FiLayers size={20} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="900" sx={{ letterSpacing: '-0.01em' }}>
              Enterprise Performance Vectors
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight="700">
              Interactive historical trends and multi-dimensional analysis
            </Typography>
          </Box>
        </Box>

        {/* Timeframe selector */}
        <Box sx={{ display: 'flex', gap: 1, bgcolor: 'background.default', p: 0.5, borderRadius: '12px', border: '1px solid', borderColor: 'divider' }}>
          {TIMEFRAMES.map((tf) => (
            <Button
              key={tf}
              size="small"
              onClick={() => setTimeframe(tf)}
              sx={{
                minWidth: 40,
                height: 28,
                borderRadius: '8px',
                fontSize: '0.7rem',
                fontWeight: 800,
                color: timeframe === tf ? 'primary.contrastText' : 'text.secondary',
                bgcolor: timeframe === tf ? 'primary.main' : 'transparent',
                boxShadow: timeframe === tf ? '0 4px 10px rgba(255, 96, 56, 0.15)' : 'none',
                '&:hover': { bgcolor: timeframe === tf ? 'primary.dark' : 'rgba(255,255,255,0.10)' }
              }}
            >
              {tf}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Metric Selector Buttons */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        {[
          { key: 'CPI', label: 'Consumer Index', color: '#FF6038' },
          { key: 'HCI', label: 'Human Capital', color: '#00E5FF' },
          { key: 'Growth', label: 'Economic Growth', color: '#10B981' }
        ].map((btn) => (
          <Button
            key={btn.key}
            size="small"
            onClick={() => setMetric(btn.key)}
            sx={{
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: 800,
              fontSize: '0.72rem',
              px: 2,
              py: 0.8,
              bgcolor: metric === btn.key ? `${btn.color}15` : 'transparent',
              color: metric === btn.key ? btn.color : 'text.secondary',
              border: '1px solid',
              borderColor: metric === btn.key ? btn.color : 'divider',
              '&:hover': { bgcolor: `${btn.color}25` }
            }}
          >
            {btn.label}
          </Button>
        ))}
      </Box>

      {/* Recharts responsive container */}
      <Box sx={{ flexGrow: 1, width: '100%', height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="cpiGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF6038" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#FF6038" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="hciGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00E5FF" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.03)'}
              vertical={false}
            />

            <XAxis
              dataKey="name"
              stroke={theme.palette.text.secondary}
              fontSize={10}
              tickLine={false}
              axisLine={false}
              dy={10}
            />

            <YAxis
              stroke={theme.palette.text.secondary}
              fontSize={10}
              tickLine={false}
              axisLine={false}
              dx={-5}
            />

            <Tooltip content={<PremiumChartsTooltip theme={theme} />} />

            {metric === 'CPI' && (
              <Area
                type="monotone"
                dataKey="CPI"
                stroke="#FF6038"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#cpiGradient)"
              />
            )}

            {metric === 'HCI' && (
              <Area
                type="monotone"
                dataKey="HCI"
                stroke="#00E5FF"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#hciGradient)"
              />
            )}

            {metric === 'Growth' && (
              <Area
                type="monotone"
                dataKey="Growth"
                stroke="#10B981"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#growthGradient)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default PremiumChartsPanel;
