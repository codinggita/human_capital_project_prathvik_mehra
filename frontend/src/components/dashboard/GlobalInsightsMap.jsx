import React, { useState } from 'react';
import { Paper, Typography, Box, useTheme, Chip, LinearProgress, Button } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { FiGlobe, FiMapPin, FiActivity, FiDatabase, FiHardDrive, FiCpu, FiLock } from 'react-icons/fi';
import { MAP_COUNTRIES } from './MapData';
import TelemetryHeatmap from './TelemetryHeatmap';
import TelemetryStatusPanel from './TelemetryStatusPanel';
import TelemetryLiveChart from './TelemetryLiveChart';
import TelemetryAIWidget from './TelemetryAIWidget';
import TelemetryOfflineOverlay from './TelemetryOfflineOverlay';
import { useSelector } from 'react-redux';

const GlobalInsightsMap = () => {
  const theme = useTheme();
  const { aiPrefs } = useSelector((s) => s.ui);
  const isTelemetryEnabled = aiPrefs?.telemetry !== false;
  const [selectedCountry, setSelectedCountry] = useState(MAP_COUNTRIES[0]);

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: '24px',
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.02)',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        boxShadow: theme.palette.mode === 'dark' ? 'none' : '0 10px 30px -10px rgba(0,0,0,0.04)'
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 1.2, borderRadius: '16px', bgcolor: 'rgba(59, 130, 246, 0.1)', color: 'primary.main' }}>
            <FiGlobe size={20} className="animate-spin-slow" />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="900" sx={{ letterSpacing: '-0.01em', color: 'text.primary' }}>
              Interactive Global Telemetry
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight="700">
              Hover pins to inspect data density & performance indicators
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* 2-Column Responsive Layout using Tailwind Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full">
        {/* Left Column: Selected Country Statistics Sidebar (lg:col-span-4) */}
        <div className="lg:col-span-4 w-full flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCountry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="h-full flex flex-col"
            >
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: '20px',
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.01)',
                  border: '1px solid',
                  borderColor: 'divider',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: 400
                }}
              >
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight="800" color="text.primary">
                      {selectedCountry.name}
                    </Typography>
                    <Chip
                      label={selectedCountry.status}
                      size="small"
                      sx={{
                        fontWeight: 800,
                        fontSize: '0.62rem',
                        bgcolor: `${selectedCountry.color}15`,
                        color: selectedCountry.color,
                        borderRadius: '6px',
                      }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                        <FiActivity size={14} />
                        <Typography variant="body2">Mean Indicator</Typography>
                      </Box>
                      <Typography variant="body2" fontWeight="800" color="text.primary">
                        {selectedCountry.avg} pts
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                        <FiDatabase size={14} />
                        <Typography variant="body2">Total Indicators</Typography>
                      </Box>
                      <Typography variant="body2" fontWeight="800" color="text.primary">
                        {selectedCountry.count} records
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                        <FiGlobe size={14} />
                        <Typography variant="body2">QoQ Growth</Typography>
                      </Box>
                      <Typography variant="body2" fontWeight="800" color="success.main">
                        {selectedCountry.trend}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mt: 3, pt: 2, borderTop: '1px dashed', borderColor: 'divider' }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight="800"
                      sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', mb: 2 }}
                    >
                      Node Integrity & Telemetry
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8 }}>
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.6 }}>
                          <Typography variant="caption" color="text.secondary" fontWeight="700">Data Reliability Score</Typography>
                          <Typography variant="caption" fontWeight="800" color="text.primary">98.4%</Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={98.4}
                          sx={{
                            height: 5,
                            borderRadius: '3px',
                            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: selectedCountry.color,
                              borderRadius: '3px',
                            }
                          }}
                        />
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                          <FiHardDrive size={13} />
                          <Typography variant="caption" fontWeight="600">Sync Interval</Typography>
                        </Box>
                        <Typography variant="caption" fontWeight="800" color="text.primary">Real-time Pipeline</Typography>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                          <FiCpu size={13} />
                          <Typography variant="caption" fontWeight="600">Response Speed</Typography>
                        </Box>
                        <Typography variant="caption" fontWeight="800" color="text.primary">12 ms (Optimized)</Typography>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                          <FiActivity size={13} />
                          <Typography variant="caption" fontWeight="600">Active Sensors</Typography>
                        </Box>
                        <Typography variant="caption" fontWeight="800" color="text.primary">HCI, CPI, Inflation</Typography>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                          <FiGlobe size={13} />
                          <Typography variant="caption" fontWeight="600">Node Region</Typography>
                        </Box>
                        <Typography variant="caption" fontWeight="800" color="text.primary">Edge-Cluster-Alpha</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                  <FiMapPin size={16} style={{ color: selectedCountry.color }} />
                  <Typography variant="caption" color="text.secondary" fontWeight="700">
                    Node Active & Telemetry Synced
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Stacked Telemetry Dashboard Widgets (lg:col-span-8) */}
        <div className="lg:col-span-8 w-full flex flex-col gap-6 relative" style={{ position: 'relative' }}>
          {/* Top row: Heatmap and Status Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <div className="w-full h-full flex flex-col">
              <TelemetryHeatmap selectedCountry={selectedCountry} onSelectCountry={setSelectedCountry} />
            </div>
            <div className="w-full h-full flex flex-col">
              <TelemetryStatusPanel />
            </div>
          </div>

          {/* Bottom row: Live Throughput Chart and AI Insights Dispatch */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <div className="w-full h-full flex flex-col">
              <TelemetryLiveChart />
            </div>
            <div className="w-full h-full flex flex-col">
              <TelemetryAIWidget />
            </div>
          </div>

          {!isTelemetryEnabled && (
            <TelemetryOfflineOverlay theme={theme} />
          )}
        </div>
      </div>
    </Paper>
  );
};

export default GlobalInsightsMap;
