import React from 'react';
import { Paper, Box, Typography, Slider } from '@mui/material';
import { FiSun, FiMoon, FiLayers, FiZap, FiBarChart2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme, updateAppearance } from '../../../features/uiSlice';
import { SectionHeader, ToggleRow, getSectionCardSx } from './Shared';

const AppearanceSettings = () => {
  const dispatch = useDispatch();
  const { themeMode, appearance } = useSelector((state) => state.ui);
  const isDark = themeMode === 'dark';
  const isNeu = appearance?.neumorphism !== false;
  const sectionCard = getSectionCardSx(isDark, isNeu, appearance.glassIntensity);

  return (
    <Paper elevation={0} sx={{ ...sectionCard, height: '100%', p: 5 }}>
      <SectionHeader
        icon={<FiSun />}
        title="Appearance & UI"
        subtitle="Theme, density & visual preferences"
        accentColor="#ff9800"
      />

      <ToggleRow
        icon={isDark ? <FiMoon /> : <FiSun />}
        title="Dark Mode"
        subtitle="Toggle enterprise dark / light UI"
        checked={isDark}
        onChange={() => dispatch(toggleTheme())}
        accentColor="#ff9800"
      />
      <ToggleRow
        icon={<FiLayers />}
        title="Neumorphism Design"
        subtitle="Toggle the neumorphic 3D shadow effects"
        checked={appearance.neumorphism !== false}
        onChange={() => dispatch(updateAppearance({ neumorphism: appearance.neumorphism === false }))}
        accentColor="#ff9800"
      />
      <ToggleRow
        icon={<FiZap />}
        title="Smooth Animations"
        subtitle="Framer Motion transitions & micro-interactions"
        checked={appearance.animations}
        onChange={() => dispatch(updateAppearance({ animations: !appearance.animations }))}
        accentColor="#ff9800"
      />
      <ToggleRow
        icon={<FiBarChart2 />}
        title="Compact Dashboard Density"
        subtitle="Tighter layout for more data per view"
        checked={appearance.density === 'compact'}
        onChange={() =>
          dispatch(updateAppearance({
            density: appearance.density === 'compact' ? 'comfortable' : 'compact',
          }))
        }
        accentColor="#ff9800"
      />

      <Box sx={{ mt: 2.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" fontWeight="700">Glassmorphism Intensity</Typography>
          <Typography variant="body2" fontWeight="800" color="primary">
            {appearance.glassIntensity}%
          </Typography>
        </Box>
        <Slider
          value={appearance.glassIntensity}
          onChange={(_, v) => dispatch(updateAppearance({ glassIntensity: v }))}
          min={0} max={100}
          sx={{
            color: '#ff9800',
            '& .MuiSlider-thumb': {
              boxShadow: '0 0 12px #ff980066',
              '&:hover': { boxShadow: '0 0 20px #ff980088' },
            },
            '& .MuiSlider-rail': { opacity: 0.2 },
          }}
        />
      </Box>
    </Paper>
  );
};

export default AppearanceSettings;
