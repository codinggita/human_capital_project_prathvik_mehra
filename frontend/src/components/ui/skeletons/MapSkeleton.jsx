import React from 'react';
import { Box } from '@mui/material';
import { SkeletonShimmer, PremiumCardShell } from './SkeletonCore';

export const MapSkeleton = ({ height = '400px' }) => {
  return (
    <PremiumCardShell sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Map Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <SkeletonShimmer width="30%" height="20px" />
        <SkeletonShimmer width="15%" height="20px" />
      </Box>

      {/* Map Area */}
      <Box sx={{ position: 'relative', height: height, width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
        <SkeletonShimmer width="100%" height="100%" sx={{ borderRadius: '12px' }} />
        
        {/* Mock Map Controls */}
        <Box sx={{ position: 'absolute', right: 16, top: 16, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <SkeletonShimmer variant="circular" width="32px" height="32px" />
          <SkeletonShimmer variant="circular" width="32px" height="32px" />
        </Box>
      </Box>
    </PremiumCardShell>
  );
};
