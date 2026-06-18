import React, { useState, useEffect } from 'react';
import { Box, TextField, InputAdornment, Select, MenuItem, Typography, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { FiSearch, FiFilter, FiMaximize2, FiMinimize2 } from 'react-icons/fi';

const CountrySearch = ({
  searchTerm, setSearchTerm,
  selectedRegion, setSelectedRegion,
  selectedStatus, setSelectedStatus,
  sortBy, setSortBy
}) => {
  const { themeMode } = useSelector((state) => state.ui);
  const isDark = themeMode === 'dark';
  const [isSticky, setIsSticky] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const glassStyle = {
    background: isDark ? 'rgba(20, 25, 40, 0.7)' : 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(20px)',
    border: '1px solid',
    borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
    boxShadow: isDark ? '0 10px 40px rgba(0,0,0,0.5)' : '0 10px 40px rgba(0,0,0,0.1)',
  };

  return (
    <Box sx={{ 
      position: isSticky ? 'fixed' : 'relative',
      top: isSticky ? 80 : 'auto',
      left: isSticky ? '50%' : 'auto',
      transform: isSticky ? 'translateX(-50%)' : 'none',
      zIndex: 100,
      width: isSticky ? (expanded ? '90%' : 'auto') : '100%',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      mb: 4
    }}>
      <motion.div
        layout
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          ...glassStyle,
          borderRadius: expanded || !isSticky ? '24px' : '50px',
          padding: '12px 24px',
          display: 'flex',
          flexDirection: expanded || !isSticky ? 'row' : 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 16,
          justifyContent: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1, minWidth: isSticky && !expanded ? 200 : 300 }}>
          <TextField
            variant="outlined"
            placeholder="Search Regions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FiSearch color={isDark ? '#a78bfa' : '#8b5cf6'} />
                </InputAdornment>
              ),
              sx: {
                borderRadius: '50px',
                bgcolor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.02)',
                '& fieldset': { border: 'none' }
              }
            }}
          />
        </Box>

        {(expanded || !isSticky) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FiFilter color={isDark ? '#a78bfa' : '#8b5cf6'} />
              <Select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                size="small"
                sx={{ borderRadius: '50px', bgcolor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.02)', '& fieldset': { border: 'none' }, minWidth: 140 }}
              >
                {['All', 'Americas', 'Europe', 'Asia Pacific', 'Middle East', 'Africa'].map(r => (
                  <MenuItem key={r} value={r}>{r}</MenuItem>
                ))}
              </Select>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary' }}>STATUS:</Typography>
              <Select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                size="small"
                sx={{ borderRadius: '50px', bgcolor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.02)', '& fieldset': { border: 'none' }, minWidth: 120 }}
              >
                {['All', 'Optimal', 'Warning', 'Critical'].map(s => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </Select>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary' }}>SORT:</Typography>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                size="small"
                sx={{ borderRadius: '50px', bgcolor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.02)', '& fieldset': { border: 'none' }, minWidth: 140 }}
              >
                <MenuItem value="score">HC Score</MenuItem>
                <MenuItem value="growth">Growth Vector</MenuItem>
                <MenuItem value="indicators">Active Indicators</MenuItem>
              </Select>
            </Box>
          </motion.div>
        )}

        {isSticky && (
          <IconButton onClick={() => setExpanded(!expanded)} sx={{ color: isDark ? '#a78bfa' : '#8b5cf6' }}>
            {expanded ? <FiMinimize2 /> : <FiMaximize2 />}
          </IconButton>
        )}
      </motion.div>
    </Box>
  );
};

export default CountrySearch;
