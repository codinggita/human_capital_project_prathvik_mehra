import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Topbar from '../components/layout/Topbar';
import Sidebar from '../components/layout/Sidebar';

const MainLayout = () => (
  <Box sx={{ display: 'flex', width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
    <CssBaseline />

    {/* Top Navigation Bar containing all menus */}
    <Topbar />

    {/* Main Content Area — responsive padding & width */}
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: { xs: 1.5, sm: 2, md: 2.5 },
        pt: { xs: 2, sm: 3 },
        minWidth: 0,
        minHeight: '100vh',
      }}
    >
      <Toolbar /> {/* Spacer pushes content below fixed topbar */}
      <Outlet />
    </Box>
  </Box>
);

export default MainLayout;

