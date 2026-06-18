import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, useTheme } from '@mui/material';
import {
  ResponsiveContainer, PieChart, Pie, Cell,
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  RadialBarChart, RadialBar,
} from 'recharts';
import { motion } from 'framer-motion';
import api from '../../services/api';
import { CardSkeleton } from '../loaders/SkeletonLoader';
import CategoryRadarChart from './CategoryRadarChart';

const RADAR_DATA = [
  { subject: 'Query Speed',    A: 110, B: 95, fullMark: 120 },
  { subject: 'Ingestion Rate', A: 105, B: 85, fullMark: 120 },
  { subject: 'Cache Effic.',   A: 115, B: 100, fullMark: 120 },
  { subject: 'API Reliab.',    A: 118, B: 105, fullMark: 120 },
  { subject: 'Net Latency',    A: 95, B: 70, fullMark: 120 },
];

const RADIAL_DATA = [
  { name: 'Index Match', value: 98, fill: '#3B82F6' },
  { name: 'Geo Cover',   value: 92, fill: '#10B981' },
  { name: 'Query Hit',   value: 99.5, fill: '#A855F7' },
];

/* ─── shared animated card ────────────────────────────────────────────────── */
const ChartCard = ({ title, height = 270, children, delay = 0 }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      style={{ width: '100%', height: '100%' }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: '24px',
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(20px)',
          border: '1px solid',
          borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(31,38,135,0.05)',
        }}
      >
        <Box sx={{ width: '100%', height: height, mb: 2 }}>
          {children}
        </Box>
        <Typography
          variant="subtitle2"
          fontWeight={900}
          align="center"
          sx={{ mt: 'auto', letterSpacing: '-0.01em', color: 'text.primary', flexShrink: 0 }}
        >
          {title}
        </Typography>
      </Paper>
    </motion.div>
  );
};

const ttStyle = (theme) => ({
  borderRadius: '12px',
  background: theme.palette.background.paper,
  border: '1px solid rgba(0,0,0,0.07)',
  fontSize: 10,
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
});

/* ═══════════════════════════════════════════════════════════════════════════ */
const MoreAnalyticsCharts = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [loading, setLoading]           = useState(true);
  const [indicatorData, setIndicatorData] = useState([]);
  const [composedData, setComposedData]   = useState([]);

  useEffect(() => {
    const fetchMoreCharts = async () => {
      try {
        const [indRes, yrRes] = await Promise.all([
          api.get('/stats/top-indicators'),
          api.get('/stats/yearly-average'),
        ]);

        setIndicatorData(
          (indRes.data.data || []).slice(0, 5).map(d => ({
            name: d._id ? (d._id.length > 25 ? d._id.substring(0, 22) + '…' : d._id) : 'General',
            value: d.recordCount,
          }))
        );
        setComposedData(
          (yrRes.data.data || [])
            .map((d, i) => ({
              year:   String(d._id),
              value:  Math.round(d.average * 100) / 100,
              volume: 15000 + i * 4200,
            }))
            .sort((a, b) => a.year.localeCompare(b.year))
        );
      } catch (err) {
        console.error('MoreAnalyticsCharts fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMoreCharts();
  }, []);

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#A855F7', '#EC4899'];
  const gridStroke = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)';
  const tickStyle  = { fill: theme.palette.text.secondary, fontSize: 9, fontWeight: 700 };

  /* ── 4-column equal grid ── */
  const gridCss = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 24,
    marginBottom: 32,
    width: '100%',
    alignItems: 'stretch',
  };

  if (loading) {
    return (
      <div style={gridCss}>
        {[...Array(4)].map((_, i) => <CardSkeleton key={i} />)}
      </div>
    );
  }

  return (
    <div style={gridCss}>
      {/* 1 ── Donut — Top Indicators Distribution */}
      <ChartCard title="Top Indicators Distribution" delay={0}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={indicatorData}
              cx="50%" cy="50%"
              innerRadius="40%" outerRadius="65%"
              paddingAngle={4}
              dataKey="value"
            >
              {indicatorData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={ttStyle(theme)} />
            <Legend
              verticalAlign="bottom"
              height={32}
              iconSize={8}
              wrapperStyle={{ fontSize: 9, fontWeight: 700 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* 2 ── Radar — System Health & Load */}
      <ChartCard title="System Health & Load Index" delay={0.07}>
        <CategoryRadarChart data={RADAR_DATA} theme={theme} isDark={isDark} bare />
      </ChartCard>

      {/* 3 ── Composed — Volume vs Mean Ingestion */}
      <ChartCard title="Mean Ingestion vs Ingested Volume" delay={0.14}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={composedData} margin={{ top: 10, right: -5, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="compGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#10B981" stopOpacity={0.85} />
                <stop offset="100%" stopColor="#10B981" stopOpacity={0.15} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={tickStyle} />
            <YAxis yAxisId="left"  axisLine={false} tickLine={false} tick={{ ...tickStyle, fontSize: 8 }} />
            <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ ...tickStyle, fontSize: 8 }} />
            <Tooltip contentStyle={ttStyle(theme)} />
            <Bar  yAxisId="left"  dataKey="volume" fill="url(#compGrad)" radius={[4, 4, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="value" stroke="#F59E0B" strokeWidth={2} dot={{ r: 2 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* 4 ── Radial Bar — Pipeline Health Index */}
      <ChartCard title="Pipeline Health Index" delay={0.21}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="40%" cy="50%"
            innerRadius="25%" outerRadius="95%"
            barSize={10}
            data={RADIAL_DATA}
          >
            <RadialBar minAngle={15} background clockWise dataKey="value" cornerRadius={5} />
            <Tooltip contentStyle={ttStyle(theme)} />
            <Legend
              iconSize={8}
              layout="vertical"
              verticalAlign="middle"
              align="right"
              wrapperStyle={{ fontSize: 9, fontWeight: 700, right: 0 }}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
};

export default MoreAnalyticsCharts;
