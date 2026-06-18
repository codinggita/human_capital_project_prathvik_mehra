import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import SEOMeta from '../../components/common/SEOMeta';

import CountrySearch from './components/CountrySearch';
import CountryOverviewTab from './components/CountryOverviewTab';
import CountryHistoryTab from './components/CountryHistoryTab';
import CountryHeatmapTab from './components/CountryHeatmapTab';

const mockCountries = [
  {
    name: 'United States',
    code: 'US',
    score: 94.2,
    growth: '+1.8%',
    trend: 'Improving',
    activeIndicators: 182,
    region: 'Americas',
    history: [92.0, 92.5, 93.0, 93.6, 94.2],
    status: 'Optimal',
  },
  {
    name: 'United Kingdom',
    code: 'GB',
    score: 89.5,
    growth: '+0.9%',
    trend: 'Stable',
    activeIndicators: 135,
    region: 'Europe',
    history: [88.5, 89.0, 89.2, 89.4, 89.5],
    status: 'Optimal',
  },
  {
    name: 'Germany',
    code: 'DE',
    score: 91.1,
    growth: '+1.2%',
    trend: 'Improving',
    activeIndicators: 148,
    region: 'Europe',
    history: [89.5, 90.1, 90.5, 90.8, 91.1],
    status: 'Optimal',
  },
  {
    name: 'Japan',
    code: 'JP',
    score: 88.7,
    growth: '-0.4%',
    trend: 'Critical',
    activeIndicators: 110,
    region: 'Asia Pacific',
    history: [89.5, 89.3, 89.1, 88.9, 88.7],
    status: 'Warning',
  },
  {
    name: 'India',
    code: 'IN',
    score: 82.4,
    growth: '+4.2%',
    trend: 'Improving',
    activeIndicators: 240,
    region: 'Asia Pacific',
    history: [78.2, 79.5, 80.8, 81.5, 82.4],
    status: 'Optimal',
  },
  {
    name: 'Brazil',
    code: 'BR',
    score: 76.9,
    growth: '+2.1%',
    trend: 'Improving',
    activeIndicators: 95,
    region: 'Americas',
    history: [74.5, 75.1, 75.8, 76.2, 76.9],
    status: 'Optimal',
  },
  {
    name: 'Australia',
    code: 'AU',
    score: 92.8,
    growth: '+1.5%',
    trend: 'Stable',
    activeIndicators: 124,
    region: 'Asia Pacific',
    history: [91.2, 91.8, 92.1, 92.5, 92.8],
    status: 'Optimal',
  },
  {
    name: 'France',
    code: 'FR',
    score: 88.2,
    growth: '+0.6%',
    trend: 'Stable',
    activeIndicators: 118,
    region: 'Europe',
    history: [87.5, 87.8, 88.0, 88.1, 88.2],
    status: 'Optimal',
  },
];

const Countries = () => {
  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('score');
  const [liveTelemetryCount, setLiveTelemetryCount] = useState(1152);

  // Live Telemetry Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTelemetryCount((prev) => prev + Math.floor(Math.random() * 5) - 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Stats calculation
  const stats = useMemo(() => {
    const total = mockCountries.length;
    const avgScore = (mockCountries.reduce((acc, c) => acc + c.score, 0) / total).toFixed(1);
    const highest = [...mockCountries].sort((a, b) => b.score - a.score)[0];
    const fastest = [...mockCountries].sort(
      (a, b) => parseFloat(b.growth) - parseFloat(a.growth)
    )[0];

    return { total, avgScore, highest, fastest };
  }, []);

  // Filter & Sort Logic
  const filteredCountries = useMemo(() => {
    return mockCountries
      .filter((c) => {
        const matchesSearch =
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.code.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRegion = selectedRegion === 'All' || c.region === selectedRegion;
        const matchesStatus = selectedStatus === 'All' || c.status === selectedStatus;
        return matchesSearch && matchesRegion && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'score') return b.score - a.score;
        if (sortBy === 'growth') return parseFloat(b.growth) - parseFloat(a.growth);
        if (sortBy === 'indicators') return b.activeIndicators - a.activeIndicators;
        return 0;
      });
  }, [searchTerm, selectedRegion, selectedStatus, sortBy]);

  // Leaderboard Data
  const leaderboardData = useMemo(() => {
    return filteredCountries.map((c) => ({
      name: c.name,
      score: c.score,
    }));
  }, [filteredCountries]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SEOMeta
        title="Global Intelligence"
        description="Futuristic enterprise-level global analytics map, intelligence feeds, region heatmap, and telemetry metrics."
        path="/countries"
      />

      {/* Header section */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
          <Typography variant="h3" fontWeight="900" sx={{ 
            letterSpacing: '-0.02em', mb: 1, 
            background: (theme) => theme.palette.mode === 'dark' ? 'linear-gradient(90deg, #c084fc, #3b82f6)' : 'linear-gradient(90deg, #9333ea, #2563eb)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}>
            Global Intelligence Matrix
          </Typography>
        </motion.div>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', fontWeight: 500 }}>
          Live telemetry, predictive demographic analysis, and synchronized human capital metrics tracking across all monitored international territories.
        </Typography>
      </Box>

      <CountryOverviewTab stats={stats} liveTelemetryCount={liveTelemetryCount} />

      <CountrySearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <CountryHistoryTab filteredCountries={filteredCountries} leaderboardData={leaderboardData} />

      <CountryHeatmapTab />
    </motion.div>
  );
};

export default Countries;
