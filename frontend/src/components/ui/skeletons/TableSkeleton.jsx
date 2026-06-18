import React from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { SkeletonShimmer, PremiumCardShell, getNeumorphicStyles } from './SkeletonCore';

export const TableSkeleton = ({ rows = 5 }) => {
  const { themeMode } = useSelector((state) => state.ui);
  const isDark = themeMode === 'dark';
  const styles = getNeumorphicStyles(isDark);

  return (
    <PremiumCardShell sx={{ width: '100%' }}>
      {/* Table Headers */}
      <Box sx={{ display: 'flex', mb: 3, gap: 2, px: 2 }}>
        <SkeletonShimmer width="20%" height="24px" />
        <SkeletonShimmer width="25%" height="24px" />
        <SkeletonShimmer width="25%" height="24px" />
        <SkeletonShimmer width="15%" height="24px" />
        <SkeletonShimmer width="15%" height="24px" />
      </Box>

      {/* Row Items */}
      {Array.from(new Array(rows)).map((_, i) => (
        <Box
          key={i}
          sx={{
            display: 'flex',
            mb: 2,
            gap: 2,
            p: 2.2,
            borderRadius: '16px',
            boxShadow: styles.innerShadow,
            backgroundColor: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.01)',
          }}
        >
          <SkeletonShimmer width="20%" height="18px" />
          <SkeletonShimmer width="25%" height="18px" />
          <SkeletonShimmer width="25%" height="18px" />
          <SkeletonShimmer width="15%" height="18px" />
          <SkeletonShimmer width="15%" height="18px" />
        </Box>
      ))}

      {/* Pagination Footer */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, px: 2 }}>
        <SkeletonShimmer width="20%" height="14px" />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <SkeletonShimmer width="40px" height="30px" />
          <SkeletonShimmer width="40px" height="30px" />
          <SkeletonShimmer width="40px" height="30px" />
        </Box>
      </Box>
    </PremiumCardShell>
  );
};

export const SkeletonTable = ({ rows = 5 }) => <TableSkeleton rows={rows} />;
