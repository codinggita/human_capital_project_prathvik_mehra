/* eslint-disable react-refresh/only-export-components */
import React from 'react';

export const MAP_COUNTRIES = [
  { id: 'USA', name: 'United States', x: 25, y: 35, avg: 62.5, count: 120, trend: '+1.2%', status: 'Improving', color: '#00E5FF' },
  { id: 'CAN', name: 'Canada', x: 22, y: 25, avg: 71.2, count: 150, trend: '+2.1%', status: 'Stable', color: '#FF6038' },
  { id: 'GBR', name: 'United Kingdom', x: 48, y: 28, avg: 64.1, count: 80, trend: '-0.4%', status: 'Stable', color: '#A855F7' },
  { id: 'DEU', name: 'Germany', x: 52, y: 30, avg: 65.8, count: 95, trend: '+0.8%', status: 'Improving', color: '#10B981' },
  { id: 'IND', name: 'India', x: 68, y: 48, avg: 58.2, count: 140, trend: '+3.4%', status: 'Rapid Growth', color: '#FF6B35' },
  { id: 'AUS', name: 'Australia', x: 85, y: 72, avg: 68.4, count: 234, trend: '+0.5%', status: 'Stable', color: '#3B82F6' },
  { id: 'BRA', name: 'Brazil', x: 38, y: 65, avg: 52.1, count: 60, trend: '+1.1%', status: 'Improving', color: '#F59E0B' },
  { id: 'SGP', name: 'Singapore', x: 74, y: 56, avg: 78.5, count: 75, trend: '+2.8%', status: 'Peak', color: '#EC4899' }
];

export const ContinentalPaths = ({ theme }) => (
  <svg
    viewBox="0 0 100 80"
    width="100%"
    height="100%"
    style={{
      position: 'absolute',
      opacity: 0.18,
      stroke: theme.palette.text.secondary,
      strokeWidth: 0.25,
      fill: 'none',
    }}
  >
    {/* North America */}
    <path d="M 5,10 Q 15,12 25,18 T 35,35 Q 25,40 18,30 Z" />
    {/* South America */}
    <path d="M 32,45 Q 40,50 38,62 T 42,75 Q 32,70 32,55 Z" />
    {/* Europe & Africa */}
    <path d="M 45,20 Q 55,18 60,30 T 52,50 Q 44,60 48,72 Q 40,55 42,40 Z" />
    {/* Asia */}
    <path d="M 58,15 Q 75,10 90,20 T 85,55 Q 70,58 64,42 Z" />
    {/* Australia */}
    <path d="M 80,65 Q 92,62 88,75 Q 78,72 80,65 Z" />
  </svg>
);
