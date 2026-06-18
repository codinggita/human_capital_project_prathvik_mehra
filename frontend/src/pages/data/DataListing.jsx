import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Box, Typography, Grid, MenuItem, Select, FormControl, IconButton } from '@mui/material';
import SEOMeta from '../../components/common/SEOMeta';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { FiDatabase, FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';

import Table from '../../components/tables/Table';
import Input from '../../components/ui/Input';
import StatCard from '../../components/charts/StatCard';
import CustomButton from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { TableSkeleton } from '../../components/loaders/SkeletonLoader';
import ErrorState from '../../components/common/ErrorState';
import { getDataColumns } from './DataColumns';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { fetchDataset, createPrice, updatePrice, deletePrice } from '../../features/dataSlice';
import { session } from '../../services/storage';
import PriceForm from '../../components/forms/PriceForm';
import DataFilterBar from './DataFilterBar';

const DataListing = () => {
  const dispatch = useDispatch();
  const { dataset, totalRecords, loading, error } = useSelector((state) => state.data);
  const { themeMode } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);

  const isAdmin = user?.role === 'admin';

  // Restore filters from sessionStorage on component mount
  const savedFilters = session.getFilters();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(savedFilters?.rowsPerPage || 10);
  const [sortBy, setSortBy] = useState(savedFilters?.sortBy || 'year');
  const [sortOrder, setSortOrder] = useState(savedFilters?.sortOrder || 'desc');
  const [searchTerm, setSearchTerm] = useState(savedFilters?.searchTerm || '');
  const [frequencyFilter, setFrequencyFilter] = useState(savedFilters?.frequencyFilter || 'all');

  // CRUD States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // Persist filters to sessionStorage whenever they change
  useEffect(() => {
    session.setFilters({ rowsPerPage, sortBy, sortOrder, searchTerm, frequencyFilter });
  }, [rowsPerPage, sortBy, sortOrder, searchTerm, frequencyFilter]);

  const loadData = useCallback(() => {
    dispatch(
      fetchDataset({
        endpoint: '/prices',
        page,
        limit: rowsPerPage,
        search: searchTerm,
        sortBy,
        sortOrder,
        frequency: frequencyFilter !== 'all' ? frequencyFilter : undefined,
      })
    );
  }, [dispatch, page, rowsPerPage, searchTerm, sortBy, sortOrder, frequencyFilter]);

  // Debounced Search effect to prevent API spam
  useEffect(() => {
    const timer = setTimeout(() => {
      loadData();
    }, 500);
    return () => clearTimeout(timer);
  }, [loadData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page on limit change
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
    setPage(0); // Reset to first page on sort
  };

  const handleAddNewClick = () => {
    setSelectedRecord(null);
    setIsFormModalOpen(true);
  };

  const handleEditClick = useCallback((record) => {
    setSelectedRecord(record);
    setIsFormModalOpen(true);
  }, []);

  const handleDeleteClick = useCallback((record) => {
    setSelectedRecord(record);
    setIsDeleteModalOpen(true);
  }, []);

  const handleFormSubmit = async (formData) => {
    setFormLoading(true);
    try {
      if (selectedRecord) {
        // Edit mode
        const id = selectedRecord._id || selectedRecord.id;
        const resultAction = await dispatch(updatePrice({ id, recordData: formData }));
        if (updatePrice.fulfilled.match(resultAction)) {
          toast.success('Record updated successfully!');
          setIsFormModalOpen(false);
        } else {
          toast.error(resultAction.payload || 'Failed to update record');
        }
      } else {
        // Create mode
        const resultAction = await dispatch(createPrice(formData));
        if (createPrice.fulfilled.match(resultAction)) {
          toast.success('Record added successfully!');
          setIsFormModalOpen(false);
        } else {
          toast.error(resultAction.payload || 'Failed to add record');
        }
      }
    } catch {
      toast.error('An unexpected error occurred.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    setFormLoading(true);
    try {
      const id = selectedRecord._id || selectedRecord.id;
      const resultAction = await dispatch(deletePrice(id));
      if (deletePrice.fulfilled.match(resultAction)) {
        toast.success('Record deleted successfully!');
        setIsDeleteModalOpen(false);
      } else {
        toast.error(resultAction.payload || 'Failed to delete record');
      }
    } catch {
      toast.error('An unexpected error occurred.');
    } finally {
      setFormLoading(false);
    }
  };

  const columns = useMemo(() => getDataColumns(isAdmin, handleEditClick, handleDeleteClick), [isAdmin, handleEditClick, handleDeleteClick]);

  const selectShadow =
    themeMode === 'dark'
      ? 'inset 2px 2px 5px #080c16, inset -2px -2px 5px #16223e'
      : 'inset 2px 2px 5px #d1d9e6, inset -2px -2px 5px #ffffff';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SEOMeta
        title="Data Explorer"
        description="Explore and filter massive MongoDB datasets with server-side pagination, real-time search, and dynamic sorting."
        path="/data"
      />

      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom sx={{ letterSpacing: '-0.02em' }}>
        Global Database Explorer
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4, mt: 1 }}>
        <Grid item xs={12} md={4}>
          <StatCard title="Total Records" value={totalRecords} icon={<FiDatabase />} />
        </Grid>
        <Grid item xs={12} md={8}>
          <DataFilterBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setPage={setPage}
            frequencyFilter={frequencyFilter}
            setFrequencyFilter={setFrequencyFilter}
            isAdmin={isAdmin}
            handleAddNewClick={handleAddNewClick}
            selectShadow={selectShadow}
          />
        </Grid>
      </Grid>

      {error ? (
        <ErrorState error={error} onRetry={loadData} />
      ) : loading && dataset.length === 0 ? (
        <TableSkeleton rows={10} />
      ) : (
        <Table
          columns={columns}
          data={dataset}
          emptyMessage="No records found matching criteria."
          // Backend Pagination Hooks
          count={totalRecords}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          // Backend Sorting Hooks
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
      )}

      {/* Edit / Create Dialog */}
      <Modal
        open={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={selectedRecord ? 'Edit Price Record' : 'Add New Price Record'}
        maxWidth="md"
      >
        <Box sx={{ pt: 1 }}>
          <PriceForm
            initialValues={selectedRecord}
            onSubmit={handleFormSubmit}
            loading={formLoading}
          />
        </Box>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={formLoading}
        selectedRecord={selectedRecord}
      />
    </motion.div>
  );
};

export default DataListing;
