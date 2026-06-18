import React from 'react';
import { Box } from '@mui/material';
import { SkeletonShimmer, PremiumCardShell } from './SkeletonCore';

export const SkeletonWidget = () => {
  return (
    <PremiumCardShell sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Header Info */}
      <SkeletonShimmer width="45%" height="18px" />

      {/* Insight bullet points */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
        {Array.from(new Array(3)).map((_, i) => (
          <Box key={i} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <SkeletonShimmer variant="circular" width="30px" height="30px" sx={{ flexShrink: 0 }} />
            <Box sx={{ flex: 1 }}>
              <SkeletonShimmer width={i % 2 === 0 ? '90%' : '80%'} height="12px" sx={{ mb: 1 }} />
              <SkeletonShimmer width={i % 2 === 0 ? '55%' : '65%'} height="10px" />
            </Box>
          </Box>
        ))}
      </Box>
    </PremiumCardShell>
  );
};
