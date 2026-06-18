import React, { useState, useRef } from 'react';
import { Box, Paper, Grid, TextField, Button, Avatar, Chip, LinearProgress, Tooltip, IconButton, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiBriefcase, FiCamera, FiSave, FiLock, FiShield, FiKey, FiGlobe, FiRefreshCw, FiEye, FiEyeOff } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { SectionHeader, SessionCard, getSectionCardSx, getTextFieldSx } from './Shared';
import { updateUserProfile } from '../../../features/authSlice';

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const { themeMode, appearance } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);
  const isDark = themeMode === 'dark';
  const isNeu = appearance?.neumorphism !== false;
  const sectionCard = getSectionCardSx(isDark, isNeu, appearance.glassIntensity);
  const textFieldSx = getTextFieldSx(isDark, isNeu);

  const [profileSaved, setProfileSaved] = useState(false);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: user?.company || 'Human Capital Analytics',
    role: user?.role || 'user',
    avatar: user?.avatar || '',
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    await dispatch(updateUserProfile({ 
      name: formData.name, 
      email: formData.email, 
      company: formData.company, 
      role: formData.role,
      avatar: formData.avatar 
    }));
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handleReset = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      company: user?.company || 'Human Capital Analytics',
      role: user?.role || 'user',
      avatar: user?.avatar || '',
    });
  };

  const filled = [formData.name, formData.email, formData.company, formData.role].filter(Boolean).length;
  const completionPct = Math.round((filled / 4) * 100);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 4, width: '100%', alignItems: 'start' }}>
      {/* ─── LEFT: PROFILE MANAGEMENT ─── */}
      <Paper elevation={0} sx={{ ...sectionCard, height: '100%' }} component={motion.div} layout>
        <SectionHeader
          icon={<FiUser />}
          title="Profile Management"
          subtitle="Manage your personal identity & account details"
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={formData.avatar || undefined}
              sx={{
                width: 80, height: 80, fontSize: '1.8rem', fontWeight: 900,
                background: 'linear-gradient(135deg, #ff6038, #ff8a50)',
                boxShadow: '0 8px 24px #ff603844',
              }}
            >
              {!formData.avatar && formData.name?.substring(0, 2)?.toUpperCase()}
            </Avatar>
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleImageChange} 
            />
            <Tooltip title="Upload photo">
              <IconButton
                onClick={() => fileInputRef.current?.click()}
                size="small"
                sx={{
                  position: 'absolute', bottom: -4, right: -4,
                  width: 28, height: 28, bgcolor: '#ff6038',
                  color: '#fff', boxShadow: '0 4px 12px #ff603866',
                  '&:hover': { bgcolor: '#e05528', transform: 'scale(1.1)' },
                  transition: 'all 0.2s',
                }}
              >
                <FiCamera size={13} />
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.8 }}>
              <Typography variant="subtitle1" fontWeight="900">
                {formData.name}
              </Typography>
              <Chip
                label={formData.role}
                size="small"
                sx={{
                  height: 22, fontSize: '0.7rem', fontWeight: 800,
                  background: 'linear-gradient(135deg, #ff603822, #ff603844)',
                  color: '#ff6038', border: '1px solid #ff603844',
                }}
              />
              <Chip
                label="● Active"
                size="small"
                sx={{
                  height: 22, fontSize: '0.7rem', fontWeight: 800,
                  bgcolor: '#4caf5018', color: '#4caf50', border: '1px solid #4caf5033',
                }}
              />
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.2 }}>
              {formData.email} · {formData.company}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <LinearProgress
                variant="determinate"
                value={completionPct}
                sx={{
                  flex: 1, height: 6, borderRadius: 4,
                  bgcolor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(90deg, #ff6038, #ff8a50)',
                    borderRadius: 4,
                  },
                }}
              />
              <Typography variant="caption" fontWeight="800" color="primary">
                {completionPct}% complete
              </Typography>
            </Box>
          </Box>
        </Box>

        <Grid container spacing={2.5}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth label="Full Name" value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              sx={textFieldSx}
              InputProps={{ startAdornment: <FiUser style={{ marginRight: 8, color: '#ff6038', opacity: 0.7 }} /> }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth label="Email Address" value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              sx={textFieldSx}
              InputProps={{ startAdornment: <FiMail style={{ marginRight: 8, color: '#2196f3', opacity: 0.7 }} /> }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth label="Organization" value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              sx={textFieldSx}
              InputProps={{ startAdornment: <FiBriefcase style={{ marginRight: 8, color: '#9c27b0', opacity: 0.7 }} /> }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth label="Role / Title" value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              sx={textFieldSx}
              InputProps={{ startAdornment: <FiShield style={{ marginRight: 8, color: '#4caf50', opacity: 0.7 }} /> }}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <AnimatePresence mode="wait">
            {profileSaved ? (
              <motion.div key="saved"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Button variant="contained" disabled
                  sx={{
                    borderRadius: '14px', py: 1.4, px: 3, fontWeight: 800,
                    background: 'linear-gradient(135deg, #4caf50, #66bb6a)',
                    boxShadow: '0 6px 20px #4caf5044',
                  }}
                >
                  Saved Successfully!
                </Button>
              </motion.div>
            ) : (
              <motion.div key="save"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Button
                  variant="contained"
                  startIcon={<FiSave />}
                  onClick={handleSave}
                  sx={{
                    borderRadius: '14px', py: 1.4, px: 3.5, fontWeight: 800,
                    background: 'linear-gradient(135deg, #ff6038, #ff8a50)',
                    boxShadow: '0 6px 20px #ff603844',
                    '&:hover': { boxShadow: '0 8px 28px #ff603866', transform: 'translateY(-1px)' },
                    transition: 'all 0.2s',
                  }}
                >
                  Save Profile
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          <Button
            variant="outlined"
            startIcon={<FiRefreshCw />}
            onClick={handleReset}
            sx={{
              borderRadius: '14px', py: 1.4, fontWeight: 700,
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.12)',
              color: 'text.secondary',
              '&:hover': { borderColor: '#ff6038', color: '#ff6038', bgcolor: '#ff603810' },
            }}
          >
            Reset
          </Button>
        </Box>
      </Paper>

      {/* ─── RIGHT: SECURITY & PRIVACY ─── */}
      <Paper elevation={0} sx={{ ...sectionCard, height: '100%' }} component={motion.div} layout>
        <SectionHeader
          icon={<FiLock />}
          title="Security & Privacy"
          subtitle="Manage passwords, 2FA, and active sessions"
          accentColor="#2196f3"
        />

        <Typography variant="subtitle2" fontWeight="800" sx={{ mb: 1.5, color: 'text.secondary', letterSpacing: '0.05em' }}>
          ACTIVE SESSIONS
        </Typography>
        <SessionCard device="Chrome · macOS" location="Mumbai, IN" time="Now" current isDark={isDark} isNeu={isNeu} />
      </Paper>
    </Box>
  );
};

export default ProfileSettings;
