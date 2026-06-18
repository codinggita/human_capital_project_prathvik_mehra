import React from 'react';
import { Grid, Paper, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { FiDatabase, FiGlobe, FiTrendingUp, FiCpu, FiActivity, FiClock } from 'react-icons/fi';

const AnalyticsKPIs = ({ analyticsData, loading }) => {

  const { themeMode, appearance } = useSelector((state) => state.ui);
  const isDark = themeMode === 'dark';
  const isNeu = appearance?.neumorphism !== false;

  const items = [
    {
      title: 'Total Indicators',
      value: analyticsData?.totalRecords?.toLocaleString() || '342,890',
      change: '+22.5% YoY',
      color: '#3B82F6',
      icon: FiDatabase,
      desc: 'MongoDB total records ingested'
    },
    {
      title: 'Active Countries',
      value: analyticsData?.totalCountries || '215',
      change: 'Global distribution',
      color: '#10B981',
      icon: FiGlobe,
      desc: 'Geopolitical database coverage'
    },
    {
      title: 'Avg Indicator Value',
      value: analyticsData?.averageValue ? `${Math.round(analyticsData.averageValue * 100) / 100} pts` : '310.25 pts',
      change: '+5.4% MoM',
      color: '#F59E0B',
      icon: FiTrendingUp,
      desc: 'Calculated pipeline mean'
    },
    {
      title: 'Active Pipelines',
      value: analyticsData?.activeUsers || '854',
      change: 'Kafka streams active',
      color: '#A855F7',
      icon: FiCpu,
      desc: 'Concurrent analytics tunnels'
    },
    {
      title: 'Data Ingestion Rate',
      value: '99.8%',
      change: 'Ultra high precision',
      color: '#06B6D4',
      icon: FiActivity,
      desc: 'API ingestion pipeline success'
    },
    {
      title: 'Avg API Response',
      value: '8.2 ms',
      change: 'Cache hits 99.7%',
      color: '#EF4444',
      icon: FiClock,
      desc: 'Optimized server response latency'
    }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 32, width: '100%' }}>
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={index}
            className="w-full h-full"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -4, scale: 1.01 }}
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
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                minHeight: 155,
                height: '100%',
                width: '100%',
                boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(31,38,135,0.05)',
              }}
            >
              {/* Decorative Background Glow */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -20,
                  right: -20,
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${item.color}15 0%, transparent 70%)`,
                  zIndex: 0
                }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}>
                <Typography variant="caption" color="text.secondary" fontWeight="800" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {item.title}
                </Typography>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: '12px',
                    bgcolor: isNeu ? 'transparent' : `${item.color}12`,
                    color: item.color,
                    display: 'flex',
                    boxShadow: isNeu ? (isDark ? 'inset 2px 2px 4px #0c0f16, inset -2px -2px 4px #1e2536' : 'inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #ffffff') : 'none',
                  }}
                >
                  <Icon size={16} />
                </Box>
              </Box>

              <Box sx={{ zIndex: 1 }}>
                <Typography variant="h5" fontWeight="950" color="text.primary" sx={{ letterSpacing: '-0.02em', mb: 0.5 }}>
                  {loading ? '...' : item.value}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="caption" fontWeight="800" sx={{ color: item.color }}>
                    {item.change}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.68rem', fontWeight: 500 }}>
                    {item.desc}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </motion.div>
        );
      })}
    </div>
  );
};

export default AnalyticsKPIs;
