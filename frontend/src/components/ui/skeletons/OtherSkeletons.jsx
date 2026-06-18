import React from 'react';
import { Box, Grid } from '@mui/material';
import { SkeletonShimmer, PremiumCardShell } from './SkeletonCore';

export const SkeletonCountryCard = () => {
  return (
    <PremiumCardShell sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* Country Header Info */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <SkeletonShimmer variant="circular" width="45px" height="45px" />
        <Box sx={{ flex: 1 }}>
          <SkeletonShimmer width="60%" height="18px" sx={{ mb: 1 }} />
          <SkeletonShimmer width="30%" height="12px" />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <SkeletonShimmer width="40%" height="12px" />
          <SkeletonShimmer width="20%" height="12px" />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <SkeletonShimmer width="50%" height="12px" />
          <SkeletonShimmer width="25%" height="12px" />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <SkeletonShimmer width="45%" height="12px" />
          <SkeletonShimmer width="30%" height="12px" />
        </Box>
      </Box>
    </PremiumCardShell>
  );
};

export const SkeletonSidebar = () => {
  return (
    <Box sx={{ px: 2, py: 4, height: '100%', display: 'flex', flexDirection: 'column', justifySpace: 'space-between', justifyContent: 'space-between' }}>
      {/* Brand Logo placeholder */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 6, px: 2 }}>
        <SkeletonShimmer variant="circular" width="36px" height="36px" />
        <SkeletonShimmer width="60%" height="16px" />
      </Box>

      {/* Nav Menu placeholders */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5, px: 1, flexGrow: 1 }}>
        {Array.from(new Array(5)).map((_, i) => (
          <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <SkeletonShimmer variant="circular" width="22px" height="22px" />
            <SkeletonShimmer width={i % 2 === 0 ? '55%' : '45%'} height="14px" />
          </Box>
        ))}
      </Box>

      {/* Bottom Profile card */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <SkeletonShimmer variant="circular" width="40px" height="40px" />
        <Box sx={{ flexGrow: 1 }}>
          <SkeletonShimmer width="70%" height="14px" sx={{ mb: 1 }} />
          <SkeletonShimmer width="45%" height="10px" />
        </Box>
      </Box>
    </Box>
  );
};

export const SkeletonNavbar = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', py: 1.5, px: 3 }}>
      {/* Left Search Bar */}
      <SkeletonShimmer width="260px" height="38px" sx={{ borderRadius: '10px' }} />

      {/* Right Controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
        <SkeletonShimmer variant="circular" width="24px" height="24px" />
        <SkeletonShimmer variant="circular" width="24px" height="24px" />
        <SkeletonShimmer variant="circular" width="34px" height="34px" />
      </Box>
    </Box>
  );
};

export const SkeletonProfile = () => {
  return (
    <Grid container spacing={4}>
      {/* Left Details column */}
      <Grid item xs={12} md={7}>
        <PremiumCardShell sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
          <SkeletonShimmer width="35%" height="22px" sx={{ mb: 1 }} />
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
            <SkeletonShimmer variant="circular" width="80px" height="80px" />
            <Box sx={{ flex: 1 }}>
              <SkeletonShimmer width="50%" height="18px" sx={{ mb: 1.5 }} />
              <SkeletonShimmer width="30%" height="12px" />
            </Box>
          </Box>

          <Grid container spacing={3.5}>
            {Array.from(new Array(4)).map((_, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <SkeletonShimmer width="40%" height="12px" sx={{ mb: 1.5 }} />
                <SkeletonShimmer width="100%" height="38px" sx={{ borderRadius: '10px' }} />
              </Grid>
            ))}
          </Grid>
          
          <SkeletonShimmer width="130px" height="40px" sx={{ mt: 2, alignSelf: 'flex-start' }} />
        </PremiumCardShell>
      </Grid>

      {/* Right Controls Column */}
      <Grid item xs={12} md={5}>
        <PremiumCardShell sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
          <SkeletonShimmer width="45%" height="22px" sx={{ mb: 2 }} />

          {Array.from(new Array(4)).map((_, i) => (
            <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ flexGrow: 1 }}>
                <SkeletonShimmer width="60%" height="14px" sx={{ mb: 1 }} />
                <SkeletonShimmer width="40%" height="10px" />
              </Box>
              <SkeletonShimmer width="46px" height="24px" sx={{ borderRadius: '14px' }} />
            </Box>
          ))}
        </PremiumCardShell>
      </Grid>
    </Grid>
  );
};
