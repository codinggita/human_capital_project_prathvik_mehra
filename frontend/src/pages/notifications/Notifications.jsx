import React, { useState } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, IconButton, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { FiBell, FiCheck, FiInfo, FiAlertTriangle, FiTrash2 } from 'react-icons/fi';
import SEOMeta from '../../components/common/SEOMeta';

const mockNotifications = [
  {
    id: 1,
    title: 'System Update Completed',
    message: 'The Human Capital Project backend has been successfully updated to version 2.4.1.',
    time: '2 minutes ago',
    type: 'success',
    read: false,
  },
  {
    id: 2,
    title: 'New User Registered',
    message: 'A new enterprise user (admin@hcproject.com) has joined the platform.',
    time: '1 hour ago',
    type: 'info',
    read: false,
  },
  {
    id: 3,
    title: 'API Rate Limit Warning',
    message: 'The MongoDB cluster experienced high latency. Request throttling is active.',
    time: '3 hours ago',
    type: 'warning',
    read: true,
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <FiCheck color="#fff" />;
      case 'warning': return <FiAlertTriangle color="#fff" />;
      case 'info': default: return <FiInfo color="#fff" />;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'success': return '#4ade80';
      case 'warning': return '#fb923c';
      case 'info': default: return '#60a5fa';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}
    >
      <SEOMeta
        title="Notifications"
        description="View your system notifications and alerts."
        path="/notifications"
      />

      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'primary.main', display: 'flex' }}>
          <FiBell size={24} color="#fff" />
        </Box>
        <Typography variant="h4" fontWeight="950" sx={{ letterSpacing: '-0.02em' }}>
          System Notifications
        </Typography>
      </Box>

      <Paper
        elevation={2}
        sx={{
          borderRadius: 4,
          overflow: 'hidden',
          backgroundColor: 'background.paper',
        }}
      >
        <List sx={{ p: 0 }}>
          {notifications.length === 0 ? (
            <Box sx={{ p: 6, textAlign: 'center' }}>
              <Typography color="text.secondary">No notifications found.</Typography>
            </Box>
          ) : (
            notifications.map((notification, index) => (
              <React.Fragment key={notification.id}>
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    p: 3,
                    bgcolor: notification.read ? 'transparent' : 'rgba(74, 222, 128, 0.05)',
                    transition: 'background-color 0.3s',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' }
                  }}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteNotification(notification.id)}>
                      <FiTrash2 size={18} />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: getColor(notification.type) }}>
                      {getIcon(notification.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography variant="subtitle1" fontWeight={notification.read ? 600 : 800}>
                          {notification.title}
                        </Typography>
                        {!notification.read && <Chip size="small" label="New" color="primary" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 800 }} />}
                      </Box>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography component="span" variant="body2" color="text.primary" sx={{ display: 'block', mb: 1 }}>
                          {notification.message}
                        </Typography>
                        <Typography component="span" variant="caption" color="text.secondary" fontWeight={600}>
                          {notification.time}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                {index < notifications.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))
          )}
        </List>
      </Paper>
    </motion.div>
  );
};

export default Notifications;
