import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import {
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Radar, Legend,
} from 'recharts';

/**
 * CategoryRadarChart
 * - When `bare` is true the component renders only the chart (no Paper wrapper),
 *   because the parent already provides a Card.
 * - When `bare` is falsy (default) it wraps itself in a Paper card — kept for
 *   backward compatibility with any direct usage.
 */
const CategoryRadarChart = ({ data, theme, isDark, bare = false }) => {
  const chart = (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data}>
        <PolarGrid stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: theme.palette.text.secondary, fontSize: 8, fontWeight: 700 }}
        />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 7 }} />
        <Radar name="Active Cluster" dataKey="A" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.28} />
        <Radar name="Replica Nodes" dataKey="B" stroke="#A855F7" fill="#A855F7" fillOpacity={0.18} />
        <Legend
          wrapperStyle={{ fontSize: 9, fontWeight: 700 }}
          iconSize={8}
        />
      </RadarChart>
    </ResponsiveContainer>
  );

  if (bare) {
    return <Box sx={{ width: '100%', height: '100%' }}>{chart}</Box>;
  }

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: '24px', backgroundColor: 'background.paper', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="subtitle2" fontWeight={900} sx={{ mb: 2.5, letterSpacing: '-0.01em', color: 'text.primary', flexShrink: 0 }}>
        System Health &amp; Load Index
      </Typography>
      <Box sx={{ flex: 1, minHeight: 240 }}>
        {chart}
      </Box>
    </Paper>
  );
};

export default CategoryRadarChart;
