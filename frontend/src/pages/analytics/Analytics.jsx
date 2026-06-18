import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { FiRefreshCcw } from 'react-icons/fi';

import SEOMeta from '../../components/common/SEOMeta';
import ErrorState from '../../components/common/ErrorState';
import { fetchStats } from '../../features/dataSlice';

// Modular Analytics Dashboard Sub-components
import AnalyticsKPIs from '../../components/analytics/AnalyticsKPIs';
import AnalyticsAIInsights from '../../components/analytics/AnalyticsAIInsights';
import AdvancedAnalyticsCharts from '../../components/analytics/AdvancedAnalyticsCharts';
import MoreAnalyticsCharts from '../../components/analytics/MoreAnalyticsCharts';
import GlobalAnalyticsPanel from '../../components/analytics/GlobalAnalyticsPanel';

const Analytics = () => {
  const dispatch = useDispatch();
  const { analyticsData, loading, error } = useSelector((state) => state.data);
  const { appearance } = useSelector((state) => state.ui);
  const isNeu = appearance?.neumorphism !== false;

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100%', maxWidth: 'none' }}
    >
      <SEOMeta
        title="Analytics Engine"
        description="Deep analytics powered by MongoDB aggregation pipelines. Visualize revenue trends, user distribution, and industry category data."
        path="/analytics"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Dataset',
          name: 'Human Capital Analytics Dataset',
          description: 'Aggregated enterprise human capital data with real-time analytics',
          url: 'https://humancapital.io/analytics',
          creator: { '@type': 'Organization', name: 'Human Capital Analytics' },
        }}
      />

      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="950" color="text.primary" sx={{ letterSpacing: '-0.03em' }}>
            Analytics Engine
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontWeight: 500 }}>
            Real-time MongoDB Aggregation Pipeline Dashboard
          </Typography>
        </Box>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<FiRefreshCcw />}
          onClick={() => dispatch(fetchStats())}
          sx={{
            borderRadius: '24px',
            px: 3,
            border: '1px solid',
            boxShadow: (theme) => isNeu ? (theme.palette.mode === 'dark'
              ? '4px 4px 8px #0c0f16, -4px -4px 8px #1e2536'
              : '4px 4px 8px #b8c1cf, -4px -4px 8px #ffffff') : 'none',
            '&:hover': {
              boxShadow: (theme) => isNeu ? (theme.palette.mode === 'dark'
                ? 'inset 2px 2px 5px #0c0f16, inset -2px -2px 5px #1e2536'
                : 'inset 2px 2px 5px #b8c1cf, inset -2px -2px 5px #ffffff') : 'none',
            }
          }}
        >
          Refresh Data
        </Button>
      </Box>

      {error ? (
        <ErrorState error={error} onRetry={() => dispatch(fetchStats())} />
      ) : (
        <>
          {/* 1. Advanced Charts Section (Line, Bar, Area charts) - MOVED TO TOP */}
          <AdvancedAnalyticsCharts />

          {/* 2. Supplementary Advanced Charts (Pie, Radar, Composed charts) */}
          <MoreAnalyticsCharts />

          {/* 3. Global Ingestion Analytics Node Rankings */}
          <GlobalAnalyticsPanel />

          {/* 4. Statistics KPIs Section - MOVED TO BOTTOM */}
          <AnalyticsKPIs analyticsData={analyticsData} loading={loading} />

          {/* 5. AI Observations Insights Section - MOVED TO BOTTOM */}
          <AnalyticsAIInsights />
        </>
      )}
    </motion.div>
  );
};

export default Analytics;
