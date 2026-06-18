import React from 'react';
import { Box, Tooltip, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { MAP_COUNTRIES, ContinentalPaths } from './MapData';

const TelemetryHeatmap = ({ selectedCountry, onSelectCountry }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: 200,
        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.015)' : 'rgba(0, 0, 0, 0.01)',
        borderRadius: '16px',
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.10) 1px, transparent 1px)',
        backgroundSize: '12px 12px',
      }}
    >
      {/* Continental outlines */}
      <ContinentalPaths theme={theme} />

      {/* Pulsing telemetry pins */}
      {MAP_COUNTRIES.map((country) => (
        <Box
          key={country.id}
          sx={{
            position: 'absolute',
            left: `${country.x}%`,
            top: `${country.y}%`,
            cursor: 'pointer',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
          }}
          onClick={() => onSelectCountry(country)}
        >
          <Tooltip title={`${country.name} (${country.status})`} arrow>
            <motion.div
              whileHover={{ scale: 1.3 }}
              animate={{
                scale: selectedCountry.id === country.id ? 1.25 : 1,
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: selectedCountry.id === country.id ? 14 : 10,
                  height: selectedCountry.id === country.id ? 14 : 10,
                  borderRadius: '50%',
                  backgroundColor: country.color,
                  boxShadow: `0 0 10px ${country.color}`,
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '300%',
                    height: '300%',
                    borderRadius: '50%',
                    border: `1px solid ${country.color}`,
                    top: '-100%',
                    left: '-100%',
                    opacity: selectedCountry.id === country.id ? 0.8 : 0.25,
                    animation: 'pulse 2s infinite',
                  },
                }}
              />
            </motion.div>
          </Tooltip>
        </Box>
      ))}
    </Box>
  );
};

export default TelemetryHeatmap;
