import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
  CircularProgress, Chip, IconButton, Menu, MenuItem, Button
} from '@mui/material';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { FiTrash2, FiMoreVertical, FiShield, FiUser } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../../services/api';
import SEOMeta from '../../components/common/SEOMeta';

const UsersPage = () => {
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === 'admin';
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Menu state for Role changing
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users');
      setUsersList(response.data.data || []);
    } catch (error) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleMenuClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedUserId(id);
  };

  const handleRoleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUserId(null);
  };

  const handleChangeRole = async (newRole) => {
    if (!selectedUserId) return;
    try {
      await api.patch(`/admin/users/${selectedUserId}`, { role: newRole });
      toast.success(`Role updated to ${newRole}`);
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update role');
    }
    handleRoleMenuClose();
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/admin/users/${id}`);
        toast.success("User deleted successfully");
        fetchUsers();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SEOMeta title="User Management" description="View and manage platform users" path="/users" />

      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom sx={{ mb: 4, letterSpacing: '-0.02em' }}>
        User Management
      </Typography>

      <Paper
        elevation={0}
        sx={{
          borderRadius: '24px',
          overflow: 'hidden',
          backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(20px)',
          border: '1px solid',
          borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                {isAdmin && <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>}
                {isAdmin && <TableCell sx={{ fontWeight: 'bold' }}>Password Hash</TableCell>}
                {isAdmin && <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>}
                {isAdmin && <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={isAdmin ? 5 : 1} align="center" sx={{ py: 6 }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : usersList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={isAdmin ? 5 : 1} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary">No users found.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                usersList.map((row) => (
                  <TableRow key={row._id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                          {row.name.charAt(0).toUpperCase()}
                        </Box>
                        <Typography fontWeight={500}>{row.name}</Typography>
                      </Box>
                    </TableCell>

                    {isAdmin && <TableCell>{row.email}</TableCell>}

                    {isAdmin && (
                      <TableCell>
                        <Box sx={{ 
                          maxWidth: 200, 
                          overflow: 'hidden', 
                          textOverflow: 'ellipsis', 
                          fontFamily: 'monospace',
                          fontSize: '0.85rem',
                          color: 'text.secondary',
                          bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.05)',
                          p: 1,
                          borderRadius: 1
                        }}>
                          {row.password || '••••••••'}
                        </Box>
                      </TableCell>
                    )}

                    {isAdmin && (
                      <TableCell>
                        <Chip
                          icon={row.role === 'admin' ? <FiShield size={14} /> : <FiUser size={14} />}
                          label={row.role === 'admin' ? 'Administrator' : 'User'}
                          size="small"
                          color={row.role === 'admin' ? 'secondary' : 'default'}
                          sx={{ fontWeight: 'bold' }}
                        />
                      </TableCell>
                    )}

                    {isAdmin && (
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={(e) => handleRoleMenuClick(e, row._id)}
                          disabled={row._id === user?._id}
                        >
                          <FiMoreVertical />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteUser(row._id)}
                          disabled={row._id === user?._id}
                          sx={{ ml: 1 }}
                        >
                          <FiTrash2 />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleRoleMenuClose}
        >
          <MenuItem onClick={() => handleChangeRole('user')}>Make User</MenuItem>
          <MenuItem onClick={() => handleChangeRole('admin')}>Make Admin</MenuItem>
        </Menu>
      </Paper>
    </motion.div>
  );
};

export default UsersPage;
