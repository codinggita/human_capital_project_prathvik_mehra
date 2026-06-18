import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, useTheme } from '@mui/material';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, Cell, LineChart, Line, Legend, PieChart, Pie,
} from 'recharts';
import { motion } from 'framer-motion';
import api from '../../services/api';
import { CardSkeleton } from '../loaders/SkeletonLoader';

const MONTH_NAMES = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/* ─── shared card wrapper ─────────────────────────────────────────────────── */
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
          variant="subtitle1"
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

/* ─── tooltip style helper ────────────────────────────────────────────────── */
const ttStyle = (theme) => ({
  borderRadius: '12px',
  background: theme.palette.background.paper,
  border: '1px solid rgba(0,0,0,0.07)',
  fontSize: 11,
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
});



/* ═══════════════════════════════════════════════════════════════════════════ */
const AdvancedAnalyticsCharts = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [loading, setLoading]         = useState(true);
  const [yearlyData, setYearlyData]   = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [indicatorData, setIndicatorData] = useState([]);
  const [valueDistData, setValueDistData] = useState([]);
  const [freqDistData, setFreqDistData]   = useState([]);

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        const [yr, cnt, mn, ind, valDist, freqDist] = await Promise.all([
          api.get('/stats/yearly-average'),
          api.get('/stats/top-countries'),
          api.get('/stats/monthly-average'),
          api.get('/stats/top-indicators'),
          api.get('/stats/value-distribution'),
          api.get('/stats/frequency-distribution'),
        ]);

        setYearlyData(
          (yr.data.data || [])
            .map(d => ({ year: String(d._id), value: Math.round(d.average * 100) / 100 }))
            .sort((a, b) => a.year.localeCompare(b.year))
        );
        setCountryData(
          (cnt.data.data || []).slice(0, 5)
            .map(d => ({ name: d._id || 'Unknown', count: d.recordCount }))
        );
        setMonthlyData(
          (mn.data.data || [])
            .map(d => ({ month: MONTH_NAMES[d._id] || `M${d._id}`, value: Math.round(d.average * 100) / 100, rawMonth: d._id }))
            .sort((a, b) => a.rawMonth - b.rawMonth)
        );
        setIndicatorData(
          (ind.data.data || []).slice(0, 5).map(d => ({
            name: d._id ? (d._id.length > 18 ? d._id.substring(0, 15) + '…' : d._id) : 'General',
            count: d.recordCount,
          }))
        );
        setValueDistData(
          (valDist.data.data || []).map(d => ({ range: d.range, count: d.count }))
        );
        setFreqDistData(
          (freqDist.data.data || []).map(d => ({ name: d.name, value: d.value }))
        );
      } catch (err) {
        console.error('AdvancedAnalyticsCharts fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCharts();
  }, []);

  const C = {
    primary:   theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    success:   '#10B981',
    info:      '#06B6D4',
    purple:    '#8B5CF6',
    pink:      '#EC4899',
    amber:     '#F59E0B',
    red:       '#EF4444',
    indigo:    '#6366F1',
  };

  const gridStroke = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)';
  const tickStyle  = { fill: theme.palette.text.secondary, fontSize: 10, fontWeight: 700 };

  if (loading) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 24, marginBottom: 32, width: '100%' }}>
        <Box sx={{ gridColumn: 'span 12' }}><CardSkeleton /></Box>
        <Box sx={{ gridColumn: 'span 6' }}><CardSkeleton /></Box>
        <Box sx={{ gridColumn: 'span 6' }}><CardSkeleton /></Box>
        <Box sx={{ gridColumn: 'span 4' }}><CardSkeleton /></Box>
        <Box sx={{ gridColumn: 'span 8' }}><CardSkeleton /></Box>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: 24,
        marginBottom: 32,
        width: '100%',
      }}
    >
      {/* 1 ── Multi-Year Ingestion Mean (Area) - FULL WIDTH */}
      <Box sx={{ gridColumn: { xs: 'span 12', lg: 'span 8' } }}>
        <ChartCard title="Multi-Year Ingestion Mean (MongoDB Aggregation)" delay={0}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={yearlyData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="yrGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={C.primary} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={C.primary} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
              <XAxis dataKey="year" axisLine={false} tickLine={false} tick={tickStyle} />
              <YAxis axisLine={false} tickLine={false} tick={tickStyle} />
              <Tooltip contentStyle={ttStyle(theme)} />
              <Area type="monotone" dataKey="value" stroke={C.primary} strokeWidth={3.5} fillOpacity={1} fill="url(#yrGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </Box>

      {/* 2 ── Top 5 Countries (Bar) - SIDE PANEL */}
      <Box sx={{ gridColumn: { xs: 'span 12', lg: 'span 4' } }}>
        <ChartCard title="Top 5 Countries — Record Distribution" delay={0.05}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={countryData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ ...tickStyle, fontSize: 9 }} />
              <YAxis axisLine={false} tickLine={false} tick={tickStyle} />
              <Tooltip contentStyle={ttStyle(theme)} />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {countryData.map((_, i) => (
                  <Cell key={i} fill={[C.secondary, C.info, C.success, C.amber, C.red][i % 5]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </Box>

      {/* 3 ── Monthly Seasonal Index (Line) - HALF WIDTH */}
      <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
        <ChartCard title="Seasonal Ingestion Fluctuations (Monthly Averages)" delay={0.1}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={tickStyle} />
              <YAxis axisLine={false} tickLine={false} tick={tickStyle} />
              <Tooltip contentStyle={ttStyle(theme)} />
              <Line
                type="monotone"
                dataKey="value"
                stroke={C.info}
                strokeWidth={4}
                dot={{ r: 4, strokeWidth: 0, fill: C.info }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </Box>

      {/* 4 ── Top 5 Indicators (Horizontal Bar) - HALF WIDTH */}
      <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
        <ChartCard title="Top 5 Indicators — Data Density" delay={0.15}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={indicatorData} margin={{ top: 10, right: 15, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={gridStroke} />
              <XAxis type="number" axisLine={false} tickLine={false} tick={tickStyle} />
              <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ ...tickStyle, fontSize: 9 }} width={90} />
              <Tooltip contentStyle={ttStyle(theme)} />
              <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                {indicatorData.map((_, i) => (
                  <Cell key={i} fill={[C.indigo, C.pink, C.purple, C.success, C.amber][i % 5]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </Box>

      {/* 5 ── Value Distribution (Bar) - WIDE */}
      <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 8' } }}>
        <ChartCard title="Record Value Ranges — Distribution" delay={0.2}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={valueDistData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
              <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ ...tickStyle, fontSize: 9 }} />
              <YAxis axisLine={false} tickLine={false} tick={tickStyle} />
              <Tooltip contentStyle={ttStyle(theme)} />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {valueDistData.map((_, i) => (
                  <Cell key={i} fill={[C.success, '#3B82F6', C.purple, C.pink, C.amber, C.red][i % 6]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </Box>

      {/* 6 ── Frequency Distribution (Donut) - NARROW */}
      <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}>
        <ChartCard title="Data Frequency Breakdown" delay={0.25}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip contentStyle={ttStyle(theme)} />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                wrapperStyle={{ fontSize: 11, fontWeight: 700 }}
              />
              <Pie
                data={freqDistData}
                cx="50%"
                cy="45%"
                innerRadius="35%"
                outerRadius="55%"
                paddingAngle={5}
                dataKey="value"
              >
                {freqDistData.map((_, i) => (
                  <Cell key={i} fill={[C.primary, C.secondary, C.success, C.amber][i % 4]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </Box>
    </div>
  );
};

export default AdvancedAnalyticsCharts;
