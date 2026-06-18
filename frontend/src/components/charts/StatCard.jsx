import React from 'react';
import { Paper, Typography, Box, Chip, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

/* ──────────────────────────────────────────────────────────────────────────
   Accent map: maps any color string → dark-mode glow + gradient config.
   Only used in dark mode — light mode uses the original Paper/layout.
────────────────────────────────────────────────────────────────────────── */
const DARK_ACCENT = {
  '#3b82f6': { glow: 'rgba(59,130,246,0.35)',  g1: '#3b82f6', g2: '#1d4ed8' },
  '#06b6d4': { glow: 'rgba(6,182,212,0.35)',   g1: '#06b6d4', g2: '#0891b2' },
  '#8b5cf6': { glow: 'rgba(139,92,246,0.35)',  g1: '#8b5cf6', g2: '#7c3aed' },
  '#a855f7': { glow: 'rgba(168,85,247,0.35)',  g1: '#a855f7', g2: '#7c3aed' },
  '#10b981': { glow: 'rgba(16,185,129,0.35)',  g1: '#10b981', g2: '#059669' },
  '#22c55e': { glow: 'rgba(34,197,94,0.35)',   g1: '#10b981', g2: '#059669' },
  '#f59e0b': { glow: 'rgba(245,158,11,0.35)',  g1: '#f59e0b', g2: '#d97706' },
  '#FF6038': { glow: 'rgba(255,96,56,0.35)',   g1: '#f59e0b', g2: '#ef4444' },
  '#FF6B35': { glow: 'rgba(255,107,53,0.35)',  g1: '#f59e0b', g2: '#ef4444' },
  '#ef4444': { glow: 'rgba(239,68,68,0.35)',   g1: '#ef4444', g2: '#dc2626' },
  '#ec4899': { glow: 'rgba(236,72,153,0.35)',  g1: '#ec4899', g2: '#db2777' },
  '#2563eb': { glow: 'rgba(37,99,235,0.35)',   g1: '#3b82f6', g2: '#1d4ed8' },
};
const getDarkAccent = (c) =>
  DARK_ACCENT[c] || { glow: 'rgba(59,130,246,0.35)', g1: '#3b82f6', g2: '#8b5cf6' };

/* ──────────────────────────────────────────────────────────────────────────
   StatCard
   • Dark mode  → premium dark neumorphic card (gradient text, glow, deep shadows)
   • Light mode → original neumorphic card (unchanged from before)
────────────────────────────────────────────────────────────────────────── */
const StatCard = ({
  title,
  value,
  icon,
  color = '#3b82f6',
  trend,
  description,
  delay = 0,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const accent = getDarkAccent(color);
  const isPositive = trend === undefined || trend >= 0;

  /* ── DARK MODE: premium deep neumorphic ── */
  if (isDark) {
    return (
      <motion.div
        whileHover={{ scale: 1.025, y: -6 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 240, damping: 22, delay }}
        style={{ height: '100%' }}
      >
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '26px',
            background: '#1a1f2e',
            border: '1px solid rgba(255,255,255,0.10)',
            boxShadow: `0 8px 32px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)`,
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            '&:hover': {
              boxShadow: `0 16px 48px rgba(0,0,0,0.8), 0 4px 16px rgba(0,0,0,0.5), 0 0 40px ${accent.glow}, inset 0 1px 0 rgba(255,255,255,0.1)`,
              border: `1px solid ${accent.g1}35`,
            },
            px: { xs: 2.5, sm: 3, md: 3.5 },
            py: { xs: 2.8, sm: 3, md: 3.5 },
            minHeight: 185,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Radial glow blob */}
          <Box sx={{
            position: 'absolute', top: -30, right: -30, width: 120, height: 120,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${accent.glow} 0%, transparent 70%)`,
            pointerEvents: 'none', zIndex: 0,
          }} />

          {/* Bottom accent stripe */}
          <Box sx={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px',
            background: `linear-gradient(90deg, transparent, ${accent.g1}, ${accent.g2}, transparent)`,
            opacity: 0.85, borderRadius: '0 0 26px 26px',
          }} />

          {/* Title + icon row */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', zIndex: 1 }}>
            <Typography sx={{
              fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: 'text.secondary', lineHeight: 1.3, flex: 1, pr: 1,
            }}>
              {title}
            </Typography>

            {/* Icon bubble — inset dark neumorphic */}
            <Box sx={{
              flexShrink: 0, width: 52, height: 52, borderRadius: '18px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `linear-gradient(135deg, ${accent.g1}22, ${accent.g2}11)`,
              border: `1.5px solid ${accent.g1}30`,
              boxShadow: `inset 3px 3px 7px rgba(0,0,0,0.5), inset -2px -2px 5px rgba(255,255,255,0.04), 0 0 16px ${accent.glow}`,
              transition: 'all 0.3s ease',
            }}>
              {React.isValidElement(icon)
                ? React.cloneElement(icon, { size: 22, color: accent.g1 })
                : icon}
            </Box>
          </Box>

          {/* Metric value */}
          <Box sx={{ zIndex: 1, mt: 2 }}>
            <Typography variant="h3" sx={{
              fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.05,
              background: `linear-gradient(135deg, ${accent.g1}, ${accent.g2})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              fontSize: { xs: '1.9rem', md: '2.3rem' }, mb: 1,
            }}>
              {value}
            </Typography>

            {/* Trend badge */}
            {trend !== undefined && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                <Box sx={{
                  display: 'inline-flex', alignItems: 'center', gap: 0.4,
                  px: 1, py: 0.3, borderRadius: '8px',
                  background: isPositive ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
                  border: isPositive ? '1px solid rgba(16,185,129,0.25)' : '1px solid rgba(239,68,68,0.25)',
                }}>
                  {isPositive
                    ? <FiTrendingUp size={11} color="#10b981" />
                    : <FiTrendingDown size={11} color="#ef4444" />}
                  <Typography component="span" sx={{
                    fontSize: '0.68rem', fontWeight: 800,
                    color: isPositive ? '#10b981' : '#ef4444', letterSpacing: '0.02em',
                  }}>
                    {Math.abs(trend)}% vs last month
                  </Typography>
                </Box>
              </Box>
            )}

            {description && (
              <Typography variant="body2" sx={{ mt: 0.8, fontSize: '0.75rem', color: 'text.secondary', lineHeight: 1.5 }}>
                {description}
              </Typography>
            )}
          </Box>
        </Box>
      </motion.div>
    );
  }

  /* ── LIGHT MODE: original neumorphic card (unchanged) ── */
  return (
    <motion.div
      whileHover={{ scale: 1.025, translateY: -3 }}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay }}
      style={{ height: '100%' }}
    >
      <Paper
        elevation={2}
        sx={{
          py: { xs: 2.8, sm: 3, md: 3.2 },
          px: { xs: 2, sm: 2.2, md: 2.5 },
          borderRadius: '24px',
          height: '100%',
          minHeight: 160,
          backgroundColor: 'background.paper',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              gutterBottom
              sx={{
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontSize: '0.72rem',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="h3"
              fontWeight="800"
              sx={{
                mt: 0.8,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'text.primary',
                fontSize: { xs: '1.8rem', md: '2.1rem' },
              }}
            >
              {value}
            </Typography>
            {trend !== undefined && (
              <Chip
                label={`${trend >= 0 ? '↑' : '↓'} ${Math.abs(trend)}% vs last month`}
                size="small"
                sx={{
                  mt: 1.2,
                  fontWeight: 800,
                  fontSize: '0.68rem',
                  bgcolor: trend >= 0 ? 'rgba(34,197,94,0.12)' : 'rgba(255,107,53,0.12)',
                  color: trend >= 0 ? 'secondary.main' : 'warning.main',
                  border: 'none',
                  borderRadius: '8px',
                  px: 0.5,
                }}
              />
            )}
            {description && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1.2, fontSize: '0.78rem' }}>
                {description}
              </Typography>
            )}
          </Box>

          {/* Original inset icon bubble */}
          <Box
            sx={{
              bgcolor: 'background.default',
              p: 1.8,
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              ml: 1.5,
              boxShadow: 'inset 4px 4px 8px #b8c1cf, inset -4px -4px 8px #ffffff',
              border: '1px solid rgba(0,0,0,0.01)',
            }}
          >
            {React.cloneElement(icon, { size: 24, color })}
          </Box>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default StatCard;
