import React from 'react';
import {
  Box, Drawer, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Toolbar, Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiHome, FiBarChart2, FiGlobe, FiSettings, FiUsers, FiDatabase, FiZap } from 'react-icons/fi';
import { setSidebarOpen } from '../../features/uiSlice';

const drawerWidth = 264;

const menuItems = [
  { text: 'Dashboard',  icon: <FiHome size={18} />,     path: '/dashboard', color: '#10b981' },
  { text: 'Analytics',  icon: <FiBarChart2 size={18} />, path: '/analytics', color: '#0ea5e9' },
  { text: 'Data Grid',  icon: <FiDatabase size={18} />,  path: '/data',      color: '#f59e0b' },
  { text: 'Users',      icon: <FiUsers size={18} />,     path: '/users',     color: '#8b5cf6' },
  { text: 'Countries',  icon: <FiGlobe size={18} />,     path: '/countries', color: '#ec4899' },
  { text: 'Settings',   icon: <FiSettings size={18} />,  path: '/settings',  color: '#64748b' },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const { sidebarOpen, themeMode } = useSelector((state) => state.ui);
  const isDark = themeMode === 'dark';

  const handleDrawerToggle = () => {
    dispatch(setSidebarOpen(!sidebarOpen));
  };

  const drawer = (
    <Box sx={{ px: 2, py: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ mb: 1 }} />

      <Typography
        sx={{
          fontSize: '0.65rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'text.secondary',
          px: 1.5,
          mb: 2,
          mt: 0.5,
        }}
      >
        Menu
      </Typography>

      <List sx={{ flex: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={NavLink}
              to={item.path}
              onClick={() => { if (window.innerWidth < 600) handleDrawerToggle(); }}
              sx={{
                borderRadius: '8px',
                py: 1.2,
                px: 2,
                transition: 'all 0.2s ease',
                '&.active': {
                  bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                  '& .MuiListItemIcon-root': { color: item.color },
                  '& .MuiListItemText-primary': { color: isDark ? '#fff' : '#000', fontWeight: 700 },
                },
                '&:hover:not(.active)': {
                  bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                  '& .MuiListItemIcon-root': { color: item.color },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: 'text.secondary',
                  minWidth: 40,
                  transition: 'color 0.2s ease',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: '0.9rem',
                      color: 'text.secondary',
                      transition: 'color 0.2s ease, font-weight 0.2s ease',
                    }}
                  >
                    {item.text}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box
        sx={{
          mx: 1,
          mb: 2,
          p: 2,
          borderRadius: '8px',
          background: isDark ? 'rgba(74, 222, 128, 0.1)' : 'rgba(74, 222, 128, 0.1)',
          border: isDark ? '1px solid rgba(74, 222, 128, 0.2)' : '1px solid rgba(74, 222, 128, 0.2)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <FiZap size={14} color="#4ade80" />
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#4ade80' }}>
            HCP System
          </Typography>
        </Box>
        <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary', fontWeight: 500 }}>
          Version 3.0 Pro
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      <Drawer
        variant="temporary"
        open={sidebarOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
