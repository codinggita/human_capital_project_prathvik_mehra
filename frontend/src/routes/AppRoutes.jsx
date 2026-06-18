import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';
import { Box } from '@mui/material';

const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const Analytics = lazy(() => import('../pages/analytics/Analytics'));
const DataListing = lazy(() => import('../pages/data/DataListing'));
const Users = lazy(() => import('../pages/users/UsersPage'));
const Countries = lazy(() => import('../pages/countries/Countries'));
const Notifications = lazy(() => import('../pages/notifications/Notifications'));
const Settings = lazy(() => import('../pages/settings/Settings'));
const NotFound = lazy(() => import('../pages/errors/404'));

import Loader from '../components/common/Loader';
import {
  SkeletonCard,
  SkeletonChart,
  SkeletonTable,
  SkeletonProfile,
  SkeletonWidget,
  SkeletonCountryCard,
} from '../components/loaders/SkeletonLoader';

const LoadingFallback = () => <Loader fullScreen={true} message="Loading Modules..." />;

// High-fidelity page transitions wrapper with minimum 1.1s loading duration
const PageLoader = ({ children }) => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState(location.pathname);
  const [loading, setLoading] = useState(true);

  if (prevLocation !== location.pathname) {
    setPrevLocation(location.pathname);
    setLoading(true);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1100);
    return () => clearTimeout(timer);
  }, [prevLocation]);

  if (loading) {
    const path = location.pathname;

    if (path === '/dashboard') {
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3 }}>
            <SkeletonCard count={1} />
            <SkeletonCard count={1} />
            <SkeletonCard count={1} />
            <SkeletonCard count={1} />
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '8fr 4fr' }, gap: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <SkeletonChart type="area" />
              <SkeletonChart type="bar" />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <SkeletonWidget />
              <SkeletonWidget />
            </Box>
          </Box>
        </Box>
      );
    }

    if (path === '/analytics') {
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 3 }}>
            <SkeletonChart type="area" />
            <SkeletonChart type="bar" />
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 3 }}>
            <SkeletonChart type="pie" />
            <SkeletonChart type="area" height="180px" />
          </Box>
        </Box>
      );
    }

    if (path === '/data') {
      return <SkeletonTable rows={8} />;
    }

    if (path === '/users') {
      return <SkeletonTable rows={5} />;
    }

    if (path === '/countries') {
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
            <SkeletonCountryCard />
            <SkeletonCountryCard />
            <SkeletonCountryCard />
            <SkeletonCountryCard />
            <SkeletonCountryCard />
            <SkeletonCountryCard />
          </Box>
        </Box>
      );
    }

    if (path === '/settings') {
      return <SkeletonProfile />;
    }

    return <Loader message="Rendering Workspace..." />;
  }

  return children;
};

const AppRoutes = () => (
  <Suspense fallback={<LoadingFallback />}>
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<PageLoader><Dashboard /></PageLoader>} />
          <Route path="/analytics" element={<PageLoader><Analytics /></PageLoader>} />
          <Route path="/data" element={<PageLoader><DataListing /></PageLoader>} />
          <Route path="/users" element={<PageLoader><Users /></PageLoader>} />
          <Route path="/countries" element={<PageLoader><Countries /></PageLoader>} />
          <Route path="/notifications" element={<PageLoader><Notifications /></PageLoader>} />
          <Route path="/settings" element={<PageLoader><Settings /></PageLoader>} />

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
