import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, Box, Paper, Button, Chip } from '@mui/material';
import SEOMeta from '../../components/common/SEOMeta';
import { FiTrendingUp, FiActivity, FiGlobe, FiDatabase, FiUsers, FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

import StatCard from '../../components/charts/StatCard';
import ErrorState from '../../components/common/ErrorState';
import { CardSkeleton } from '../../components/loaders/SkeletonLoader';
import { fetchStats } from '../../features/dataSlice';
import { fetchUsers } from '../../features/userSlice';
import api from '../../services/api';

// Premium SaaS Dashboard Subcomponents
import AIAnalyticsAssistant from '../../components/dashboard/AIAnalyticsAssistant';
import GlobalInsightsMap from '../../components/dashboard/GlobalInsightsMap';
import LiveActivityMonitor from '../../components/dashboard/LiveActivityMonitor';
import PremiumChartsPanel from '../../components/dashboard/PremiumChartsPanel';
import QuickActionsDashboard from '../../components/dashboard/QuickActionsDashboard';
import ExtremeHighlights from '../../components/dashboard/ExtremeHighlights';
import SystemHealthWidget from '../../components/dashboard/SystemHealthWidget';

// Typewriter Effect Component
const TypewriterText = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayText((prev) => {
        if (!isDeleting && prev === text) {
          setTimeout(() => setIsDeleting(true), 2000);
          return prev;
        }
        if (isDeleting && prev === '') {
          setIsDeleting(false);
          return '';
        }
        return isDeleting ? prev.slice(0, -1) : text.slice(0, prev.length + 1);
      });
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, text]);

  return (
    <span>
      {displayText}
      <span className="animate-pulse ml-1 text-primary-main">|</span>
    </span>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();

  const { analyticsData, loading: dataLoading, error: dataError } = useSelector(
    (state) => state.data
  );
  const { usersList, loading: usersLoading } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);

  // Extreme value states fetched from MongoDB
  const [highestValue, setHighestValue] = useState(null);
  const [lowestValue, setLowestValue] = useState(null);
  const [extraLoading, setExtraLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchStats());
    if (user?.role === 'admin') {
      dispatch(fetchUsers());
    }
  }, [dispatch, user]);

  useEffect(() => {
    const fetchExtraStats = async () => {
      setExtraLoading(true);
      try {
        const [highestRes, lowestRes] = await Promise.all([
          api.get('/stats/highest-value'),
          api.get('/stats/lowest-value'),
        ]);

        setHighestValue(highestRes.data.data);
        setLowestValue(lowestRes.data.data);
      } catch (err) {
        console.error('Failed to fetch premium dashboard stats:', err);
      } finally {
        setExtraLoading(false);
      }
    };

    fetchExtraStats();
  }, []);

  const loading = dataLoading || usersLoading;

  // Global KPI Metrics Configuration
  const stats = [
    {
      title: 'Total Indicators',
      value: analyticsData?.totalIndicators?.toLocaleString() || '1,872',
      icon: <FiDatabase />,
      color: '#2563EB',
      trend: 5.4,
      delay: 0,
    },
    {
      title: 'Tracked Countries',
      value: analyticsData?.totalCountries?.toLocaleString() || '8',
      icon: <FiGlobe />,
      color: '#22C55E',
      trend: 0,
      delay: 0.05,
    },
    {
      title: 'Active Platform Users',
      value: (user?.role === 'admin' && usersList?.length > 0
        ? usersList.length
        : (analyticsData?.activeUsers || '4')
      ).toLocaleString(),
      icon: <FiUsers />,
      color: '#A855F7',
      trend: analyticsData?.usersTrend || 8.3,
      delay: 0.1,
    },
    {
      title: 'Economic Growth Rate',
      value: analyticsData?.growthRate ? `+${analyticsData.growthRate}%` : '+2.8%',
      icon: <FiTrendingUp />,
      color: '#FF6B35',
      trend: analyticsData?.growthTrend || 2.1,
      delay: 0.15,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      style={{ width: '100%', maxWidth: 'none' }}
    >
      <SEOMeta
        title="Premium Dashboard"
        description="Real-time enterprise Human Capital Analytics Dashboard. Monitor KPIs, user metrics, and MongoDB-driven data insights."
        path="/dashboard"
      />

      {/* Header and Welcome Banner */}
      <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight="950" gutterBottom sx={{ letterSpacing: '-0.02em', minHeight: '40px' }}>
            <TypewriterText text={`Welcome back${user?.name ? `, ${user.name.split(' ')[0]}` : ''} 👋`} />
          </Typography>
          <Typography variant="body1" color="text.secondary" fontWeight="600">
            Real-time economic intelligence and platform metrics — powered by MongoDB.
          </Typography>
        </Box>
        <Chip
          label={`PLATFORM SECURE • HTTPS`}
          size="small"
          sx={{
            fontWeight: 800,
            fontSize: '0.68rem',
            letterSpacing: '0.04em',
            bgcolor: 'rgba(37, 99, 235, 0.1)',
            color: '#2563EB',
            borderRadius: '8px',
            px: 0.5,
          }}
        />
      </Box>

      {/* Error State */}
      {dataError && <ErrorState error={dataError} onRetry={() => dispatch(fetchStats())} />}

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 w-full">
        {stats.map((stat, i) => (
          <div key={i} className="h-full w-full">
            {loading ? (
              <CardSkeleton />
            ) : (
              <StatCard
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                color={stat.color}
                trend={stat.trend}
                delay={stat.delay}
              />
            )}
          </div>
        ))}
      </div>

      {/* Top Banner Map - Completely different from Sahoo's flow */}
      <Box sx={{ mb: 6, width: '100%' }}>
        {loading ? <CardSkeleton /> : <GlobalInsightsMap />}
      </Box>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full mb-6">
        
        {/* Left Column (lg:col-span-4) */}
        <div className="lg:col-span-4 flex flex-col gap-6 w-full">
          <AIAnalyticsAssistant />
          <QuickActionsDashboard />
          <SystemHealthWidget />
          <ExtremeHighlights
            highestValue={highestValue}
            lowestValue={lowestValue}
            averageValue={analyticsData?.averageValue}
            extraLoading={extraLoading}
            loading={loading}
          />
        </div>

        {/* Right Column (lg:col-span-8) */}
        <div className="lg:col-span-8 flex flex-col gap-6 w-full">
          {loading ? <CardSkeleton /> : <PremiumChartsPanel serverData={analyticsData?.trend} />}
          <LiveActivityMonitor />
        </div>

      </div>
    </motion.div>
  );
};

export default Dashboard;
