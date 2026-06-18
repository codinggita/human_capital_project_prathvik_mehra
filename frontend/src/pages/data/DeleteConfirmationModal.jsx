import React from 'react';
import { Box, Typography } from '@mui/material';
import Modal from '../../components/ui/Modal';
import CustomButton from '../../components/ui/Button';

const DeleteConfirmationModal = ({ open, onClose, onConfirm, loading, selectedRecord }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Confirm Record Deletion"
      actions={
        <Box sx={{ display: 'flex', gap: 2 }}>
          <CustomButton variant="outlined" onClick={onClose}>
            Cancel
          </CustomButton>
          <CustomButton color="warning" onClick={onConfirm} loading={loading}>
            Delete Permanent
          </CustomButton>
        </Box>
      }
    >
      <Typography variant="body1">
        Are you sure you want to permanently delete this price record? This action cannot be undone.
      </Typography>
      {selectedRecord && (
        <Box sx={{ mt: 2, p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
          <Typography variant="body2"><strong>Indicator:</strong> {selectedRecord.indicatorName} ({selectedRecord.indicatorCode})</Typography>
          <Typography variant="body2"><strong>Country:</strong> {selectedRecord.countryName}</Typography>
          <Typography variant="body2"><strong>Period/Value:</strong> {selectedRecord.year} / {selectedRecord.value}</Typography>
        </Box>
      )}
    </Modal>
  );
};

export default DeleteConfirmationModal;
