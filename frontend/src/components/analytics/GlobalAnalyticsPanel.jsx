import React from 'react';
import { Paper, Typography, Box, LinearProgress } from '@mui/material';
import { FiTrendingUp, FiServer, FiGlobe, FiCpu, FiCheckCircle, FiList, FiClock, FiDatabase, FiLayers } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const TOP_NATIONS = [
  { rank: '#1', country: 'United States',  records: '289.4k', stability: 99.8, speed: '8 ms', trend: '+15.2%', color: '#3B82F6' },
  { rank: '#2', country: 'France',         records: '112.5k', stability: 99.2, speed: '14 ms', trend: '+8.4%',  color: '#A855F7' },
  { rank: '#3', country: 'Japan',          records: '85.2k',  stability: 99.9, speed: '6 ms',  trend: '+12.1%', color: '#10B981' },
  { rank: '#4', country: 'Brazil',         records: '54.3k',  stability: 98.1, speed: '25 ms', trend: '+5.5%',  color: '#F59E0B' },
  { rank: '#5', country: 'Australia',      records: '32.8k',  stability: 99.4, speed: '18 ms', trend: '+9.2%',  color: '#EF4444' },
];

const EDGE_REGIONS = [
  { name: 'North America', gateway: 'AWS us-west-2',       health: '99.9%', active: true  },
  { name: 'Europe Gateway',gateway: 'Azure westeurope',    health: '99.5%', active: true  },
  { name: 'Asia-Pacific',  gateway: 'GCP asia-northeast1', health: '99.8%', active: true  },
  { name: 'Latin America', gateway: 'AWS sa-east-1',       health: '98.2%', active: false },
];

const RECENT_EVENTS = [
  { text: 'Matched 324 records (Japan)',     time: '1s ago'  },
  { text: 'Aggregated GDP (France)',         time: '12s ago' },
  { text: 'Calculated moving average',       time: '45s ago' },
  { text: 'Cleared Memcached clusters',      time: '2m ago'  },
  { text: 'Optimized node routing rules',    time: '4m ago'  },
];

const POOL_METRICS = [
  { label: 'Active Connections',    value: '315 / 1000',   color: '#3B82F6' },
  { label: 'Avg Query Queue',       value: '0.2 (Low)',    color: '#10B981' },
  { label: 'Thread Ingestion Load', value: '28.4%', progress: 28.4, color: '#A855F7' },
  { label: 'Replica Set Status',    value: 'PRIMARY / OK', color: '#10B981' },
];

/* ─── shared card ─────────────────────────────────────────────────────────── */
const PanelCard = ({ icon: Icon, iconClass, title, children, delay = 0 }) => {
  const { themeMode } = useSelector((s) => s.ui);
  const isDark = themeMode === 'dark';

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
          boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(31,38,135,0.05)',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 3 }}>
          <Icon size={18} className={iconClass} />
          <Typography
            variant="subtitle2"
            fontWeight={900}
            sx={{ letterSpacing: '-0.01em', color: 'text.primary', textTransform: 'uppercase' }}
          >
            {title}
          </Typography>
        </Box>
        {children}
      </Paper>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════ */
const GlobalAnalyticsPanel = () => {
  const { themeMode, appearance } = useSelector((s) => s.ui);
  const isDark = themeMode === 'dark';
  const isNeu  = appearance?.neumorphism !== false;

  const neuShadow = isNeu
    ? isDark
      ? 'inset 2px 2px 4px #0c0f16, inset -2px -2px 4px #1e2536'
      : 'inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #ffffff'
    : 'none';

  const rowStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 24,
    marginBottom: 32,
    width: '100%',
    alignItems: 'stretch',
  };

  return (
    <div style={rowStyle}>
      {/* 1 ── Country Intel Rankings */}
      <PanelCard icon={FiGlobe} iconClass="text-blue-500" title="Country Rankings" delay={0}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {TOP_NATIONS.map((n, i) => (
            <Box
              key={i}
              sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                p: 1, borderRadius: '12px', gap: 1.5,
                bgcolor: isNeu ? 'transparent' : (isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.005)'),
                border: isNeu ? 'none' : '1px solid', borderColor: isNeu ? 'transparent' : 'divider',
                boxShadow: neuShadow,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
                <Typography variant="caption" fontWeight={950} sx={{ color: n.color, width: 16 }}>{n.rank}</Typography>
                <Typography variant="caption" fontWeight={800} color="text.primary" noWrap>{n.country}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.62rem', fontWeight: 600 }}>{n.records}</Typography>
                <Typography variant="caption" fontWeight={900} color="success.main" sx={{ fontSize: '0.62rem' }}>{n.trend}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </PanelCard>

      {/* 2 ── Edge Cloud Gateways */}
      <PanelCard icon={FiServer} iconClass="text-purple-500" title="Edge Cloud Gateways" delay={0.07}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {EDGE_REGIONS.map((r, i) => (
            <Box
              key={i}
              sx={{
                p: 1, borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                bgcolor: isNeu ? 'transparent' : (isDark ? 'rgba(255,255,255,0.005)' : 'rgba(0,0,0,0.002)'),
                border: isNeu ? 'none' : '1px solid', borderColor: isNeu ? 'transparent' : 'divider',
                boxShadow: neuShadow,
              }}
            >
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="caption" fontWeight={800} color="text.primary" sx={{ fontSize: '0.72rem' }} noWrap>{r.name}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.58rem', display: 'block' }} noWrap>{r.gateway}</Typography>
              </Box>
              <FiCheckCircle size={12} className={r.active ? 'text-emerald-500' : 'text-zinc-400'} />
            </Box>
          ))}
        </Box>
      </PanelCard>

      {/* 3 ── Pipeline Event Logs */}
      <PanelCard icon={FiList} iconClass="text-emerald-500" title="Pipeline Event Logs" delay={0.14}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {RECENT_EVENTS.map((ev, i) => (
            <Box
              key={i}
              sx={{
                p: 1, borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1.5,
                border: isNeu ? 'none' : '1px dashed', borderColor: isNeu ? 'transparent' : 'divider',
                boxShadow: neuShadow,
              }}
            >
              <Typography variant="caption" color="text.primary" fontWeight={700} sx={{ fontSize: '0.62rem', fontFamily: 'monospace' }} noWrap>
                {ev.text}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.58rem', flexShrink: 0 }}>
                {ev.time}
              </Typography>
            </Box>
          ))}
        </Box>
      </PanelCard>

      {/* 4 ── MongoDB Pool Telemetry */}
      <PanelCard icon={FiDatabase} iconClass="text-amber-500" title="MongoDB Pool Telemetry" delay={0.21}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {POOL_METRICS.map((m, i) => (
            <Box
              key={i}
              sx={{
                p: 1, borderRadius: '12px',
                bgcolor: isNeu ? 'transparent' : (isDark ? 'rgba(255,255,255,0.005)' : 'rgba(0,0,0,0.002)'),
                border: isNeu ? 'none' : '1px solid', borderColor: isNeu ? 'transparent' : 'divider',
                boxShadow: neuShadow,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: m.progress ? 0.5 : 0 }}>
                <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ fontSize: '0.65rem' }}>{m.label}</Typography>
                <Typography variant="caption" fontWeight={900} sx={{ color: m.color, fontSize: '0.68rem' }}>{m.value}</Typography>
              </Box>
              {m.progress && (
                <LinearProgress
                  variant="determinate"
                  value={m.progress}
                  sx={{
                    height: 3, borderRadius: '2px', bgcolor: 'divider',
                    '& .MuiLinearProgress-bar': { bgcolor: m.color },
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      </PanelCard>
    </div>
  );
};

export default GlobalAnalyticsPanel;
