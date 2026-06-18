import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { SkeletonShimmer, PremiumCardShell } from './SkeletonCore';

export const SkeletonChart = ({ type = 'area', height = '260px' }) => {
  return (
    <PremiumCardShell sx={{ width: '100%', height: '100%' }}>
      {/* Title placeholder */}
      <SkeletonShimmer width="35%" height="18px" sx={{ mb: 4 }} />

      <Box sx={{ height: height, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
        {/* Render different styles of chart indicators */}
        {type === 'pie' ? (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 4 }}>
            {/* Pie donut outer */}
            <SkeletonShimmer variant="circular" width="180px" height="180px" sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              '&::after': {
                content: '""',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                backgroundColor: 'background.paper',
                display: 'block'
              }
            }} />
            {/* Pie legend items */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, width: '120px' }}>
              <SkeletonShimmer width="100%" height="12px" />
              <SkeletonShimmer width="80%" height="12px" />
              <SkeletonShimmer width="90%" height="12px" />
            </Box>
          </Box>
        ) : type === 'bar' ? (
          <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '80%', px: 2, mb: 2 }}>
            <SkeletonShimmer width="8%" height="45%" />
            <SkeletonShimmer width="8%" height="80%" />
            <SkeletonShimmer width="8%" height="60%" />
            <SkeletonShimmer width="8%" height="90%" />
            <SkeletonShimmer width="8%" height="35%" />
            <SkeletonShimmer width="8%" height="75%" />
            <SkeletonShimmer width="8%" height="50%" />
            <SkeletonShimmer width="8%" height="85%" />
          </Box>
        ) : (
          /* Area / Line wavy mockup using grid rows and wavy container */
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, height: '80%', mb: 2 }}>
            <SkeletonShimmer width="100%" height="2px" sx={{ opacity: 0.3 }} />
            <SkeletonShimmer width="100%" height="2px" sx={{ opacity: 0.3 }} />
            <SkeletonShimmer width="100%" height="2px" sx={{ opacity: 0.3 }} />
            {/* Wavy lines placeholder */}
            <Box sx={{ position: 'absolute', bottom: '15%', left: 0, right: 0, height: '50%' }}>
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'flex-end' }}
              >
                <svg width="100%" height="100%" viewBox="0 0 100 30" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                  <path d="M0,25 Q15,5 30,20 T60,10 T90,18 T100,8 L100,30 L0,30 Z" fill="rgba(59, 130, 246, 0.05)" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1" />
                </svg>
              </motion.div>
            </Box>
          </Box>
        )}

        {/* X-Axis labels */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 1, borderTop: '1px solid rgba(0,0,0,0.05)' }}>
          <SkeletonShimmer width="10%" height="10px" />
          <SkeletonShimmer width="10%" height="10px" />
          <SkeletonShimmer width="10%" height="10px" />
          <SkeletonShimmer width="10%" height="10px" />
          <SkeletonShimmer width="10%" height="10px" />
        </Box>
      </Box>
    </PremiumCardShell>
  );
};
