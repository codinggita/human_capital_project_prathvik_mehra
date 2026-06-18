import React from 'react';
import { Box, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { SkeletonShimmer, PremiumCardShell } from './SkeletonCore';

export const CardSkeleton = ({ delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      style={{ height: '100%', width: '100%' }}
    >
      <PremiumCardShell sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
        {/* Top bar: label + icon */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <SkeletonShimmer width="55%" height="16px" />
          <SkeletonShimmer variant="circular" width="40px" height="40px" />
        </Box>
        
        {/* Metric Value */}
        <SkeletonShimmer width="70%" height="36px" sx={{ my: 0.5 }} />

        {/* Growth/Telemetry footer */}
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <SkeletonShimmer width="25%" height="20px" />
          <SkeletonShimmer width="45%" height="14px" />
        </Box>
      </PremiumCardShell>
    </motion.div>
  );
};

export const SkeletonCard = ({ count = 4 }) => {
  return (
    <Grid container spacing={3} sx={{ width: '100%' }}>
      {Array.from({ length: count }).map((_, idx) => (
        <Grid item xs={12} sm={6} md={3} key={idx}>
          <CardSkeleton delay={idx * 0.08} />
        </Grid>
      ))}
    </Grid>
  );
};
