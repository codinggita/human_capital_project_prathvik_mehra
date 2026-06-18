import React from 'react';
import { Box, IconButton } from '@mui/material';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

export const getDataColumns = (isAdmin, handleEditClick, handleDeleteClick) => {
  const cols = [
    { header: 'Indicator Name', accessor: 'indicatorName', sortable: true },
    { header: 'Country Name', accessor: 'countryName', sortable: true },
    { header: 'Country Code', accessor: 'countryCode', sortable: true },
    {
      header: 'Value',
      accessor: 'value',
      sortable: true,
      render: (row) => row.value != null ? Number(row.value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '-',
    },
    {
      header: 'Frequency',
      accessor: 'frequency',
      sortable: true,
      render: (row) => row.frequency === 'M' ? 'Monthly' : row.frequency === 'A' ? 'Annual' : row.frequency || '-',
    },
    {
      header: 'Period',
      accessor: 'year',
      sortable: true,
      render: (row) => row.month ? `${row.year} / M${String(row.month).padStart(2, '0')}` : `${row.year}`,
    },
  ];

  if (isAdmin) {
    cols.push({
      header: 'Actions',
      accessor: 'actions',
      sortable: false,
      render: (row) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton size="small" onClick={() => handleEditClick(row)} color="primary">
            <FiEdit size={16} />
          </IconButton>
          <IconButton size="small" onClick={() => handleDeleteClick(row)} color="error">
            <FiTrash2 size={16} />
          </IconButton>
        </Box>
      ),
    });
  }

  return cols;
};
