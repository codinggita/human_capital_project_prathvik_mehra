import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, IconButton, Box, Button, Chip, Avatar } from '@mui/material';
import { FiMenu, FiMoon, FiSun, FiLogOut, FiZap, FiBell } from 'react-icons/fi';
import { toggleSidebar, toggleTheme } from '../../features/uiSlice';
import { logout } from '../../features/authSlice';
import { useNavigate, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiBarChart2, FiDatabase, FiGlobe, FiUsers, FiSettings } from 'react-icons/fi';

const navItems = [
  { text: 'Dashboard', path: '/dashboard', icon: <FiHome size={16} /> },
  { text: 'Analytics', path: '/analytics', icon: <FiBarChart2 size={16} /> },
  { text: 'Data', path: '/data', icon: <FiDatabase size={16} /> },
  { text: 'Countries', path: '/countries', icon: <FiGlobe size={16} /> },
  { text: 'Users', path: '/users', icon: <FiUsers size={16} /> },
  { text: 'Settings', path: '/settings', icon: <FiSettings size={16} /> },
];

const Topbar = () => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const { themeMode } = useSelector((state) => state.ui);
  const { user }      = useSelector((state) => state.auth);
  const isDark = themeMode === 'dark';

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        color: 'text.primary',
        background: 'transparent', // Let App.jsx theme override handle the blur/bg
      }}
    >
      <Toolbar sx={{ minHeight: '68px !important', px: { xs: 2, sm: 3 }, gap: 1.5 }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => dispatch(toggleSidebar())}
          sx={{ display: { sm: 'none' }, mr: 0.5 }}
        >
          <FiMenu />
        </IconButton>

        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 4 }}>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1.5 }}>
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Box
                component="img"
                src="/assets/logo.png"
                alt="HCP Analysis Logo"
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '10px',
                  objectFit: 'cover',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}
              />
            </motion.div>

            <Box>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  color: isDark ? '#fff' : '#1c1917',
                }}
              >
                HCP Analytics
              </Typography>
            </Box>
          </Box>

          <Chip
            label="● LIVE"
            size="small"
            sx={{
              display: { xs: 'none', lg: 'flex' },
              height: 22,
              fontSize: '0.65rem',
              fontWeight: 800,
              bgcolor: isDark ? 'rgba(74,222,128,0.1)' : 'rgba(74,222,128,0.1)',
              color: '#4ade80',
              border: isDark ? '1px solid rgba(74,222,128,0.2)' : '1px solid rgba(74,222,128,0.2)',
            }}
          />

          {/* New Horizontal Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1, ml: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                component={NavLink}
                to={item.path}
                startIcon={item.icon}
                sx={{
                  color: 'text.secondary',
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 2,
                  py: 0.8,
                  borderRadius: '12px',
                  transition: 'all 0.2s',
                  '&.active': {
                    bgcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                    color: isDark ? '#fff' : '#000',
                    fontWeight: 700,
                  },
                  '&:hover:not(.active)': {
                    bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                    color: isDark ? '#f3f4f6' : '#1f2937',
                  }
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            <Avatar 
              src={user?.avatar || undefined} 
              sx={{ 
                width: 32, height: 32, 
                bgcolor: 'primary.main', 
                fontSize: '0.85rem', fontWeight: 800 
              }}
            >
              {!user?.avatar && (user?.name?.substring(0, 2)?.toUpperCase() || 'AD')}
            </Avatar>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 600,
              }}
            >
              {user?.name || 'Administrator'}
            </Typography>
          </Box>

          <IconButton
            size="small"
            onClick={() => navigate('/notifications')}
            sx={{
              display: { xs: 'none', sm: 'flex' },
              width: 36,
              height: 36,
              borderRadius: '8px',
              bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
              color: 'text.secondary',
            }}
          >
            <FiBell size={16} />
          </IconButton>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Box
              onClick={() => dispatch(toggleTheme())}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: '8px',
                cursor: 'pointer',
                bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                color: isDark ? '#f59e0b' : 'text.secondary',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                },
              }}
            >
              {isDark ? <FiSun size={17} /> : <FiMoon size={17} />}
            </Box>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              color="primary"
              variant="contained"
              size="small"
              onClick={handleLogout}
              startIcon={<FiLogOut size={14} />}
              sx={{
                display: { xs: 'none', sm: 'flex' },
                borderRadius: '8px',
                boxShadow: 'none',
              }}
            >
              Logout
            </Button>
          </motion.div>

          <IconButton
            color="error"
            onClick={handleLogout}
            sx={{ display: { xs: 'flex', sm: 'none' } }}
          >
            <FiLogOut />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
