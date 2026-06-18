import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { FiInbox } from 'react-icons/fi';

const EmptyState = ({ message = 'No data found.' }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      py: 10,
      px: 2,
      textAlign: 'center',
    }}
  >
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, type: 'spring', bounce: 0.5 }}
      style={{ marginBottom: '24px', color: '#94A3B8' }}
    >
      <FiInbox size={72} strokeWidth={1} />
    </motion.div>
    <Typography variant="h6" color="text.secondary" fontWeight="bold">
      {message}
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
      Try adjusting your filters or search terms.
    </Typography>
  </Box>
);

export default EmptyState;
