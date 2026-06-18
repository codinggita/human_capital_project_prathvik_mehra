import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, Cell } from 'recharts';
import { FiTrendingUp, FiTrendingDown, FiTarget } from 'react-icons/fi';

const FlipCard = ({ country, isDark }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const isPositive = country.growth.startsWith('+');

  const frontBg = isDark 
    ? 'linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.9))' 
    : 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(241,245,249,0.9))';

  const backBg = isDark
    ? 'linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.95))'
    : 'linear-gradient(135deg, rgba(241,245,249,0.95), rgba(255,255,255,0.95))';

  return (
    <Box 
      sx={{ perspective: 1000, height: 260, width: '100%' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d' }}
      >
        {/* Front Face */}
        <Paper
          elevation={0}
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            background: frontBg,
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            border: '1px solid',
            borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.05)',
          }}
        >
          <Avatar 
            src={`https://flagcdn.com/w80/${country.code.toLowerCase()}.png`}
            alt={country.name}
            sx={{ 
              width: 64, 
              height: 64, 
              bgcolor: 'primary.main', 
              mb: 2, 
              border: '3px solid', 
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            {country.code}
          </Avatar>
          <Typography variant="h5" fontWeight="900" sx={{ mb: 0.5 }}>{country.name}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{country.region}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h3" fontWeight="900" color={isPositive ? '#4ade80' : '#f87171'}>
              {country.score}
            </Typography>
            <Typography variant="h6" color="text.secondary">%</Typography>
          </Box>
        </Paper>

        {/* Back Face */}
        <Paper
          elevation={0}
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            background: backBg,
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            border: '1px solid',
            borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
            p: 3,
            transform: 'rotateY(180deg)',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.05)',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="subtitle2" fontWeight="bold">History</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: isPositive ? '#4ade80' : '#f87171' }}>
              {isPositive ? <FiTrendingUp /> : <FiTrendingDown />}
              <Typography variant="caption" fontWeight="bold">{country.growth}</Typography>
            </Box>
          </Box>
          
          <Box sx={{ flexGrow: 1, width: '100%', mb: 2 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={country.history.map((val, i) => ({ value: val, index: i }))}>
                <defs>
                  <linearGradient id={`color-${country.code}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isPositive ? '#4ade80' : '#f87171'} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={isPositive ? '#4ade80' : '#f87171'} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke={isPositive ? '#4ade80' : '#f87171'} strokeWidth={3} fillOpacity={1} fill={`url(#color-${country.code})`} />
              </AreaChart>
            </ResponsiveContainer>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', pt: 1.5 }}>
            <Box>
              <Typography variant="caption" color="text.secondary">Active Indicators</Typography>
              <Typography variant="subtitle2" fontWeight="bold">{country.activeIndicators}</Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="caption" color="text.secondary">Status</Typography>
              <Typography variant="subtitle2" fontWeight="bold" color={country.status === 'Optimal' ? '#4ade80' : '#facc15'}>
                {country.status}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

const CountryHistoryTab = ({ filteredCountries, leaderboardData }) => {
  const { themeMode } = useSelector((state) => state.ui);
  const isDark = themeMode === 'dark';

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" fontWeight="900" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1, color: isDark ? '#c084fc' : '#9333ea' }}>
        <FiTarget size={24} /> Regional Analytics Matrix
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3, mb: 6 }}>
        {filteredCountries.map((country) => (
          <motion.div 
            key={country.code}
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.3 }}
            style={{ height: '100%' }}
          >
            <FlipCard country={country} isDark={isDark} />
          </motion.div>
        ))}
      </Box>

      <Typography variant="h5" fontWeight="900" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1, color: isDark ? '#c084fc' : '#9333ea' }}>
        Global Hierarchy
      </Typography>
      
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: '24px',
          bgcolor: isDark ? 'rgba(30,41,59,0.5)' : 'rgba(241,245,249,0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
        }}
      >
        {leaderboardData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={leaderboardData} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
              <XAxis type="number" hide domain={[50, 100]} />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#fff' : '#000', fontWeight: 'bold' }} />
              <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', background: isDark ? '#0f172a' : '#fff', color: isDark ? '#fff' : '#000', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }} />
              <Bar dataKey="score" radius={[0, 12, 12, 0]} barSize={24}>
                {leaderboardData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={isDark ? `hsl(270, 80%, ${60 - index * 5}%)` : `hsl(270, 80%, ${50 + index * 5}%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <Typography align="center" color="text.secondary">No data matches the current filters.</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default CountryHistoryTab;
