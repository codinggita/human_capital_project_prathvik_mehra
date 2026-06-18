import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiLock } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const INSIGHTS = [
  {
    text: "Consumer Price Index (CPI) in Canada peaked at 142.77 in late 2026, representing a strong consumer spending baseline.",
    category: "Market Trend",
    color: "#FF6038"
  },
  {
    text: "US Human Capital Index shows a steady floor at 0.72. Opportunity detected to aggregate skills indices.",
    category: "Labor Index",
    color: "#00E5FF"
  },
  {
    text: "Australia database records representation has reached 234 indicators, marking it a high-confidence data node.",
    category: "Data Integrity",
    color: "#10B981"
  },
  {
    text: "Inflation-related indexes represent 46% of all tracked records. Diversification is recommended in next batch import.",
    category: "Recommendation",
    color: "#A855F7"
  }
];

const AIInsightsTab = ({ theme }) => {
  const navigate = useNavigate();
  const { aiPrefs } = useSelector((s) => s.ui);
  const isEnabled = aiPrefs?.smartInsights !== false;

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
          Smart Insights Disabled
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ maxWidth: 260, mb: 2.5, fontWeight: 600, lineHeight: 1.4 }}>
          Enable AI Insights Panel to display personalized overlay recommendations.
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
      key="insights"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '16px', flexGrow: 1 }}
    >
      {INSIGHTS.map((insight, index) => (
        <Box
          key={index}
          sx={{
            p: 2,
            borderRadius: '16px',
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.01)',
            borderLeft: `4px solid ${insight.color}`,
            display: 'flex',
            flexDirection: 'column',
            gap: 0.8
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" fontWeight="800" sx={{ color: insight.color, textTransform: 'uppercase', fontSize: '0.68rem', letterSpacing: '0.04em' }}>
              {insight.category}
            </Typography>
            <FiCheckCircle size={14} color="#10B981" />
          </Box>
          <Typography variant="body2" color="text.primary" fontWeight="600" sx={{ lineHeight: 1.4, fontSize: '0.82rem' }}>
            {insight.text}
          </Typography>
        </Box>
      ))}
    </motion.div>
  );
};

export default AIInsightsTab;
export { INSIGHTS };
