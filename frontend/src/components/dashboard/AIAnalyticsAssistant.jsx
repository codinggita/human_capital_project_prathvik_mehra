import React, { useState } from 'react';
import { Paper, Typography, Box, Button, Chip, useTheme } from '@mui/material';
import { FiZap } from 'react-icons/fi';
import AIInsightsTab from './AIInsightsTab';
import AIPredictionsTab from './AIPredictionsTab';

const AIAnalyticsAssistant = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('insights'); // 'insights' | 'predictions'
  const [loading, setLoading] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleAskQuestion = (question, answer) => {
    setSelectedQuestion(question);
    setLoading(true);
    setTypingText('');

    setTimeout(() => {
      setLoading(false);
      let index = 0;
      const interval = setInterval(() => {
        if (index < answer.length) {
          setTypingText((prev) => prev + answer.charAt(index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 15);
    }, 800);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: '24px',
        height: '100%',
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.02)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 480,
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 1.2,
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #FF6038 0%, #A855F7 100%)',
              color: 'white',
              boxShadow: '0 8px 16px rgba(255, 96, 56, 0.25)',
            }}
          >
            <FiZap size={20} className="animate-pulse" />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="900" sx={{ display: 'flex', alignItems: 'center', gap: 0.8, letterSpacing: '-0.01em' }}>
              Cognitive AI Assistant
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight="700">
              Llama-3-Driven Analytics Engine
            </Typography>
          </Box>
        </Box>
        <Chip
          label="AGENT ONLINE"
          size="small"
          sx={{
            fontWeight: 800,
            fontSize: '0.65rem',
            letterSpacing: '0.05em',
            bgcolor: 'rgba(34, 197, 94, 0.1)',
            color: '#22C55E',
            borderRadius: '8px',
          }}
        />
      </Box>

      {/* Tabs Selector */}
      <Box sx={{ display: 'flex', gap: 1.5, mb: 3.5, bgcolor: 'background.default', p: 0.6, borderRadius: '14px', border: '1px solid', borderColor: 'divider' }}>
        <Button
          fullWidth
          size="small"
          onClick={() => { setActiveTab('insights'); setSelectedQuestion(null); }}
          sx={{
            borderRadius: '10px',
            textTransform: 'none',
            fontWeight: 700,
            fontSize: '0.78rem',
            color: activeTab === 'insights' ? 'primary.contrastText' : 'text.secondary',
            bgcolor: activeTab === 'insights' ? 'primary.main' : 'transparent',
            boxShadow: activeTab === 'insights' ? '0 4px 12px rgba(255, 96, 56, 0.2)' : 'none',
            '&:hover': { bgcolor: activeTab === 'insights' ? 'primary.dark' : 'rgba(255,255,255,0.10)' }
          }}
        >
          Insights
        </Button>
        <Button
          fullWidth
          size="small"
          onClick={() => { setActiveTab('predictions'); setSelectedQuestion(null); }}
          sx={{
            borderRadius: '10px',
            textTransform: 'none',
            fontWeight: 700,
            fontSize: '0.78rem',
            color: activeTab === 'predictions' ? 'primary.contrastText' : 'text.secondary',
            bgcolor: activeTab === 'predictions' ? 'primary.main' : 'transparent',
            boxShadow: activeTab === 'predictions' ? '0 4px 12px rgba(255, 96, 56, 0.2)' : 'none',
            '&:hover': { bgcolor: activeTab === 'predictions' ? 'primary.dark' : 'rgba(255,255,255,0.10)' }
          }}
        >
          Trend Predictor
        </Button>
      </Box>

      {/* Tab Contents */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          maxHeight: 320,
          overflowY: 'auto',
          pr: 0.5,
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
          },
        }}
      >
        {activeTab === 'insights' ? (
          <AIInsightsTab theme={theme} />
        ) : (
          <AIPredictionsTab
            handleAskQuestion={handleAskQuestion}
            selectedQuestion={selectedQuestion}
            loading={loading}
            typingText={typingText}
          />
        )}
      </Box>
    </Paper>
  );
};

export default AIAnalyticsAssistant;
