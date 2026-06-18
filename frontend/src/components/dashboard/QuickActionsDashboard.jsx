import React from 'react';
import { Paper, Typography, Box, Button, Chip, useTheme, Grid } from '@mui/material';
import { FiDownload, FiPlus, FiSettings, FiSliders, FiDatabase, FiGrid, FiFolder } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const SHORTCUTS = [
  { name: 'CPI 2026', desc: 'CPI filter for year 2026', type: 'CPI' },
  { name: 'US HCI', desc: 'HCI filter for USA', type: 'HCI' },
  { name: 'Canada Global', desc: 'All indicators in Canada', type: 'All' },
];

const QuickActionsDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleExport = (format) => {
    alert(`Exporting database schema in ${format} format... Compiled payload is ready for download.`);
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
        justifyContent: 'space-between',
      }}
    >
      <Box>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 1.2,
              borderRadius: '16px',
              bgcolor: 'rgba(168, 85, 247, 0.1)',
              color: '#A855F7',
            }}
          >
            <FiSliders size={20} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="900" sx={{ letterSpacing: '-0.01em' }}>
              Operations Desk
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight="700">
              Run rapid actions, filter bookmarks and data exports
            </Typography>
          </Box>
        </Box>

        {/* Action Triggers */}
        <Typography variant="subtitle2" color="text.secondary" fontWeight="800" sx={{ mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.72rem' }}>
          Quick Triggers
        </Typography>
        <Grid container spacing={1.5} sx={{ mb: 3.5 }}>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              size="small"
              startIcon={<FiPlus />}
              onClick={() => navigate('/countries')}
              sx={{
                textTransform: 'none',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '0.74rem',
                py: 1,
                background: 'linear-gradient(135deg, #FF6038 0%, #FF8A6C 100%)',
                boxShadow: '0 4px 12px rgba(255,96,56,0.2)',
              }}
            >
              Add Record
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              size="small"
              startIcon={<FiSettings />}
              onClick={() => navigate('/settings')}
              sx={{
                textTransform: 'none',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '0.74rem',
                py: 1,
              }}
            >
              Preferences
            </Button>
          </Grid>
        </Grid>

        {/* Saved Filters */}
        <Typography variant="subtitle2" color="text.secondary" fontWeight="800" sx={{ mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.72rem' }}>
          Saved Query Shortcuts
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
          {SHORTCUTS.map((item, idx) => (
            <Box
              key={idx}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 1.2,
                borderRadius: '12px',
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.01)',
                border: '1px solid',
                borderColor: 'divider',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.02)',
                  borderColor: 'primary.main',
                }
              }}
              onClick={() => navigate('/analytics')}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <FiFolder size={14} color="#A855F7" />
                <Box>
                  <Typography variant="body2" fontWeight="800" color="text.primary" sx={{ fontSize: '0.78rem', lineHeight: 1.1 }}>
                    {item.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.68rem', fontWeight: 600 }}>
                    {item.desc}
                  </Typography>
                </Box>
              </Box>
              <Chip
                label={item.type}
                size="small"
                sx={{
                  height: 18,
                  fontSize: '0.6rem',
                  fontWeight: 800,
                  borderRadius: '4px',
                  bgcolor: 'background.default',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Export Options */}
      <Box sx={{ pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography variant="subtitle2" color="text.secondary" fontWeight="800" sx={{ mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.72rem' }}>
          Data Export Hub
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button
            fullWidth
            variant="outlined"
            size="small"
            startIcon={<FiDownload />}
            onClick={() => handleExport('CSV')}
            sx={{ textTransform: 'none', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 700 }}
          >
            Export CSV
          </Button>
          <Button
            fullWidth
            variant="outlined"
            size="small"
            startIcon={<FiDownload />}
            onClick={() => handleExport('JSON')}
            sx={{ textTransform: 'none', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 700 }}
          >
            Export JSON
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default QuickActionsDashboard;
