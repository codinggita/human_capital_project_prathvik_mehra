import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import { FiTrendingUp } from 'react-icons/fi';

const TelemetryLiveChart = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const strokeColor = isDark ? '#00E5FF' : '#0EA5E9';
  const stopColor = isDark ? '#00E5FF' : '#0EA5E9';

  const [dataPoints, setDataPoints] = useState([40, 45, 38, 52, 48, 60, 55, 62, 58, 65, 70, 72]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints((prev) => {
        const nextVal = Math.max(30, Math.min(95, prev[prev.length - 1] + (Math.random() * 20 - 10)));
        return [...prev.slice(1), nextVal];
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Compute SVG points
  const width = 300;
  const height = 80;
  const maxVal = Math.max(...dataPoints, 100);
  const minVal = Math.min(...dataPoints, 0);
  const range = maxVal - minVal || 1;

  const points = dataPoints
    .map((val, index) => {
      const x = (index / (dataPoints.length - 1)) * width;
      const y = height - ((val - minVal) / range) * (height - 10) - 5;
      return `${x},${y}`;
    })
    .join(' ');

  const areaPoints = `0,${height} ${points} ${width},${height}`;

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
        gap: 1.5,
        justifyContent: 'space-between',
        minHeight: 160
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: strokeColor }}>
          <FiTrendingUp size={14} />
          <Typography variant="caption" color="text.secondary" fontWeight="800">
            Sync Pipeline Throughput
          </Typography>
        </Box>
        <Typography variant="caption" fontWeight="900" color="success.main">
          +8.4% speed
        </Typography>
      </Box>

      {/* SVG Sparkline */}
      <Box sx={{ width: '100%', height: 80, mt: 1, position: 'relative' }}>
        <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="sparklineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={stopColor} stopOpacity={0.25} />
              <stop offset="100%" stopColor={stopColor} stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Fill Area */}
          <polygon points={areaPoints} fill="url(#sparklineGrad)" />
          {/* Stroke Line */}
          <polyline points={points} fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Box>
    </Paper>
  );
};

export default TelemetryLiveChart;
