import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Typography, ThemeProvider, createTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { FiDatabase } from 'react-icons/fi';
import { useSelector } from 'react-redux';

const AuthLayout = () => {
  const { themeMode } = useSelector((state) => state.ui);
  const isDark = themeMode === 'dark';

  const formTheme = createTheme({
    palette: {
      mode: themeMode,
      primary: { main: '#fb923c' },
      background: { default: 'transparent', paper: 'transparent' },
      text: { primary: isDark ? '#f3f4f6' : '#1c1917', secondary: isDark ? '#9ca3af' : '#57534e' },
    },
    typography: {
      fontFamily: '"Outfit", "Inter", sans-serif',
      button: { textTransform: 'none', fontWeight: 600 },
      h3: { fontWeight: 800 },
      h4: { fontWeight: 700 },
    },
    shape: { borderRadius: 8 },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
            '& fieldset': { borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' },
            '&:hover fieldset': { borderColor: 'rgba(251, 146, 60, 0.5) !important' },
            '&.Mui-focused fieldset': { borderColor: '#fb923c !important' },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: '1rem', boxShadow: 'none' },
          contained: {
            background: '#fb923c',
            color: '#fff',
            '&:hover': {
              background: '#ea580c',
              boxShadow: 'none',
              transform: 'translateY(-1px)',
            },
          },
        },
      },
    },
  });

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: isDark 
        ? 'radial-gradient(circle at 50% 50%, #2f251c 0%, #140d07 100%)' 
        : 'radial-gradient(circle at 50% 50%, #fffbf2 0%, #fef3c7 100%)',
      p: 2,
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: 440 }}
      >
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 4,
        }}>
          <Box sx={{
            width: 48, height: 48, borderRadius: 2,
            background: '#4ade80',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            mb: 2,
          }}>
            <FiDatabase size={24} color={'#fff'} />
          </Box>
          <Typography variant="h5" fontWeight={800} sx={{ color: isDark ? '#fff' : '#1c1917' }}>
            HCP Analytics
          </Typography>
          <Typography variant="body2" sx={{ color: isDark ? '#94a3b8' : '#64748b' }}>
            Enter your credentials to access the dashboard
          </Typography>
        </Box>

        <Box sx={{
          background: isDark ? '#26234b' : '#ffffff',
          borderRadius: 3,
          p: { xs: 3, sm: 4 },
          boxShadow: isDark 
            ? '0 10px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)' 
            : '0 10px 40px rgba(0,0,0,0.05)',
          border: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
        }}>
          <ThemeProvider theme={formTheme}>
            <Outlet />
          </ThemeProvider>
        </Box>
      </motion.div>
    </Box>
  );
};

export default AuthLayout;
