import React from 'react';
import { Box, Typography } from '@mui/material';
import { FiDatabase, FiTrendingUp, FiShield, FiGlobe } from 'react-icons/fi';

const features = [
  { icon: <FiTrendingUp size={14} />, label: 'Real-Time Analytics' },
  { icon: <FiDatabase size={14} />, label: 'MongoDB Driven' },
  { icon: <FiShield size={14} />, label: 'JWT Secured' },
  { icon: <FiGlobe size={14} />, label: 'Global Intelligence' },
];

const AuthBookLeftPage = () => {
  return (
    <Box
      sx={{
        flex: 1,
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: { md: 4, lg: 5 },
        background: `linear-gradient(145deg, rgba(6,10,30,0.99) 0%, rgba(10,18,52,0.98) 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Inner glow top-left */}
      <Box sx={{
        position: 'absolute', top: -100, left: -80,
        width: 350, height: 350, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      {/* Inner glow bottom-right */}
      <Box sx={{
        position: 'absolute', bottom: -60, right: -60,
        width: 250, height: 250, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Top: Logo */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, position: 'relative' }}>
        <Box sx={{
          width: 42, height: 42, borderRadius: 2,
          background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 20px rgba(59,130,246,0.5)',
          flexShrink: 0,
        }}>
          <FiDatabase size={20} color="#fff" />
        </Box>
        <Typography variant="caption" fontWeight={700} sx={{
          color: 'rgba(255,255,255,0.55)', letterSpacing: '0.14em', textTransform: 'uppercase',
        }}>
          Human Capital
        </Typography>
      </Box>

      {/* Middle: Headline */}
      <Box sx={{ my: 'auto', py: 2.5, position: 'relative' }}>
        <Typography variant="h3" fontWeight={800}
          sx={{ color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em', mb: 2.5 }}
        >
          Enterprise
          <br />
          <Box component="span" sx={{
            background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Analytics
          </Box>
          <br />
          Platform
        </Typography>

        <Typography variant="body2" sx={{
          color: 'rgba(255,255,255,0.45)', lineHeight: 1.9, mb: 4, maxWidth: 310,
        }}>
          Real-time MongoDB-powered dashboards, advanced aggregation pipelines,
          and global human capital insights — all in one place.
        </Typography>

        {/* Feature pills */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.2 }}>
          {features.map((f) => (
            <Box key={f.label} sx={{
              display: 'flex', alignItems: 'center', gap: 0.8,
              px: 2, py: 0.9, borderRadius: 3,
              background: 'rgba(59,130,246,0.08)',
              border: '1px solid rgba(59,130,246,0.2)',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s',
              cursor: 'default',
              '&:hover': {
                background: 'rgba(59,130,246,0.18)',
                borderColor: 'rgba(59,130,246,0.45)',
              },
            }}>
              <Box sx={{ color: '#60A5FA' }}>{f.icon}</Box>
              <Typography variant="caption" sx={{ color: '#93C5FD', fontWeight: 700, letterSpacing: '0.03em' }}>
                {f.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Bottom: Stats */}
      <Box sx={{ display: 'flex', gap: 4, pt: 3, borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative' }}>
        {[['190k+', 'Data Points'], ['195', 'Countries'], ['99.9%', 'Uptime']].map(([val, label]) => (
          <Box key={label}>
            <Typography variant="h6" fontWeight={800} sx={{ color: '#3B82F6', lineHeight: 1 }}>{val}</Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em' }}>{label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AuthBookLeftPage;
