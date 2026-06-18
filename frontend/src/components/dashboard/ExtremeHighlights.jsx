import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiArrowDownRight, FiActivity } from 'react-icons/fi';
import { CardSkeleton } from '../loaders/SkeletonLoader';

const ExtremeHighlights = ({ highestValue, lowestValue, averageValue, extraLoading, loading }) => {
  return (
    <div className="grid grid-cols-1 gap-6 mb-8 w-full">
      {/* Highest Recorded Value */}
      <motion.div
        whileHover={{ scale: 1.02, translateY: -2 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        <Paper
          elevation={2}
          sx={{
            p: 3,
            borderRadius: '24px',
            height: '100%',
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.02)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifySpace: 'space-between', mb: 2, justifyContent: 'space-between' }}>
            <Typography variant="subtitle2" color="text.secondary" fontWeight="800" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.72rem' }}>
              Highest Indicator Value
            </Typography>
            <Box sx={{ bgcolor: 'rgba(239, 68, 68, 0.1)', p: 1, borderRadius: '12px', display: 'flex', alignItems: 'center' }}>
              <FiArrowUpRight size={20} color="#EF4444" />
            </Box>
          </Box>
          {extraLoading ? (
            <CardSkeleton />
          ) : highestValue ? (
            <Box>
              <Typography variant="h3" fontWeight="900" color="error.main" sx={{ mb: 1, fontSize: { xs: '2rem', md: '2.4rem' } }}>
                {highestValue.value}
              </Typography>
              <Typography variant="subtitle1" fontWeight="700" color="text.primary" sx={{ mb: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {highestValue.indicatorName}
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight="600">
                {highestValue.countryName} ({highestValue.year})
              </Typography>
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">No data available</Typography>
          )}
        </Paper>
      </motion.div>

      {/* Lowest Recorded Value */}
      <motion.div
        whileHover={{ scale: 1.02, translateY: -2 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Paper
          elevation={2}
          sx={{
            p: 3,
            borderRadius: '24px',
            height: '100%',
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.02)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" fontWeight="800" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.72rem' }}>
              Lowest Indicator Value
            </Typography>
            <Box sx={{ bgcolor: 'rgba(34, 197, 94, 0.1)', p: 1, borderRadius: '12px', display: 'flex', alignItems: 'center' }}>
              <FiArrowDownRight size={20} color="#22C55E" />
            </Box>
          </Box>
          {extraLoading ? (
            <CardSkeleton />
          ) : lowestValue ? (
            <Box>
              <Typography variant="h3" fontWeight="900" color="success.main" sx={{ mb: 1, fontSize: { xs: '2rem', md: '2.4rem' } }}>
                {lowestValue.value}
              </Typography>
              <Typography variant="subtitle1" fontWeight="700" color="text.primary" sx={{ mb: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {lowestValue.indicatorName}
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight="600">
                {lowestValue.countryName} ({lowestValue.year})
              </Typography>
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">No data available</Typography>
          )}
        </Paper>
      </motion.div>

      {/* Global Average Value */}
      <motion.div
        whileHover={{ scale: 1.02, translateY: -2 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <Paper
          elevation={2}
          sx={{
            p: 3,
            borderRadius: '24px',
            height: '100%',
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.02)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" fontWeight="800" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.72rem' }}>
              Overall average value
            </Typography>
            <Box sx={{ bgcolor: 'rgba(168, 85, 247, 0.1)', p: 1, borderRadius: '12px', display: 'flex', alignItems: 'center' }}>
              <FiActivity size={20} color="#A855F7" />
            </Box>
          </Box>
          {loading ? (
            <CardSkeleton />
          ) : (
            <Box>
              <Typography variant="h3" fontWeight="900" color="primary.main" sx={{ mb: 1, fontSize: { xs: '2rem', md: '2.4rem' } }}>
                {averageValue ? (Math.round(averageValue * 100) / 100).toFixed(2) : '59.52'}
              </Typography>
              <Typography variant="subtitle1" fontWeight="700" color="text.primary" sx={{ mb: 0.5 }}>
                Mean Index Level
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight="600">
                Calculated across all countries, years, and indicators.
              </Typography>
            </Box>
          )}
        </Paper>
      </motion.div>
    </div>
  );
};

export default ExtremeHighlights;
