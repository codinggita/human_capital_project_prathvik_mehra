import React from 'react';
import { Box, Typography, Button, Divider, Paper, Skeleton } from '@mui/material';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiLock } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PREDICTIONS = [
  "Global CPI indices are projected to normalize by +1.4% entering Q3 2026.",
  "Oceania regional datasets display high-volume stabilization signals.",
  "MongoDB query latencies suggest index optimizations will save ~4.2s per 10k items."
];

const AIPredictionsTab = ({ handleAskQuestion, selectedQuestion, loading, typingText }) => {
  const navigate = useNavigate();
  const { aiPrefs } = useSelector((s) => s.ui);
  const isEnabled = aiPrefs?.predictions !== false;

  if (!isEnabled) {
    return (
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          p: 3,
          borderRadius: '20px',
          background: 'rgba(156, 39, 176, 0.03)',
          border: '1px solid rgba(156, 39, 176, 0.15)',
          backdropFilter: 'blur(8px)',
          minHeight: '260px',
          height: '100%',
        }}
      >
        <Box
          sx={{
            width: 46,
            height: 46,
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #9c27b018, #9c27b033)',
            border: '1px solid rgba(156, 39, 176, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#9c27b0',
            fontSize: 18,
            mb: 2,
            boxShadow: '0 0 15px rgba(156, 39, 176, 0.1)',
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.03)' },
              '100%': { transform: 'scale(1)' }
            }
          }}
        >
          <FiLock />
        </Box>
        <Typography variant="body2" fontWeight="800" sx={{ mb: 1, color: 'text.primary', fontSize: '0.88rem' }}>
          AI Trend Predictions Disabled
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ maxWidth: 260, mb: 2.5, fontWeight: 600, lineHeight: 1.4 }}>
          Enable predictions under AI settings to forecast indices 30 days ahead.
        </Typography>
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate('/settings')}
          sx={{
            borderRadius: '10px',
            py: 0.8,
            px: 2.5,
            fontWeight: 800,
            fontSize: '0.72rem',
            background: 'linear-gradient(135deg, #9c27b0, #ba68c8)',
            boxShadow: '0 3px 10px rgba(156, 39, 176, 0.25)',
            color: '#fff',
            textTransform: 'none',
            '&:hover': {
              background: 'linear-gradient(135deg, #7b1fa2, #9c27b0)',
              boxShadow: '0 4px 12px rgba(156, 39, 176, 0.3)',
            },
          }}
        >
          Configure AI Settings
        </Button>
      </Box>
    );
  }

  return (
    <motion.div
      key="predictions"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '20px', flexGrow: 1 }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8 }}>
        {PREDICTIONS.map((pred, i) => (
          <Box key={i} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
            <Box sx={{ bgcolor: 'rgba(255,96,56,0.1)', color: '#FF6038', p: 0.8, borderRadius: '8px', mt: 0.2 }}>
              <FiTrendingUp size={14} />
            </Box>
            <Typography variant="body2" color="text.secondary" fontWeight="600" sx={{ fontSize: '0.8rem', lineHeight: 1.4 }}>
              {pred}
            </Typography>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 1 }} />

      {/* Ask AI Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Typography variant="subtitle2" fontWeight="800" sx={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'text.secondary' }}>
          Ask AI Agent
        </Typography>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleAskQuestion("Estimate next month CPI", "Based on current autoregressive lag variables and a 3-month rolling mean of Canada indices, we project next month's average Consumer Price Index (CPI) to stabilize at 143.15 (+0.26%).")}
            sx={{ textTransform: 'none', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 700, p: 1 }}
          >
            Estimate next CPI
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleAskQuestion("Suggest db cleaning tasks", "Analytics database contains 1,872 items. Suggesting: (1) Flush the query aggregation cache once a week. (2) Set compound indexes on year & countryCode. (3) Compress duplicate data records.")}
            sx={{ textTransform: 'none', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 700, p: 1 }}
          >
            Suggest DB tasks
          </Button>
        </div>

        {/* AI Text output block */}
        {(selectedQuestion || loading) && (
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: '16px',
              bgcolor: 'background.default',
              border: '1px solid',
              borderColor: 'divider',
              minHeight: 80,
            }}
          >
            {loading ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Skeleton variant="text" width="60%" height={16} />
                <Skeleton variant="text" width="90%" height={12} />
                <Skeleton variant="text" width="80%" height={12} />
              </Box>
            ) : (
              <Box>
                <Typography variant="caption" fontWeight="800" color="primary.main" sx={{ display: 'block', mb: 0.5 }}>
                  Q: {selectedQuestion}
                </Typography>
                <Typography variant="body2" color="text.primary" fontWeight="600" sx={{ fontSize: '0.78rem', lineHeight: 1.4 }}>
                  {typingText}
                  <span className="inline-block w-1.5 h-3 ml-0.5 bg-primary animate-pulse" />
                </Typography>
              </Box>
            )}
          </Paper>
        )}
      </Box>
    </motion.div>
  );
};

export default AIPredictionsTab;
