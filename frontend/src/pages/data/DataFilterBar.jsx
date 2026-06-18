import React from 'react';
import { Box, FormControl, Select, MenuItem } from '@mui/material';
import { FiPlus } from 'react-icons/fi';
import Input from '../../components/ui/Input';
import CustomButton from '../../components/ui/Button';

const DataFilterBar = ({ 
  searchTerm, 
  setSearchTerm, 
  setPage, 
  frequencyFilter, 
  setFrequencyFilter, 
  isAdmin, 
  handleAddNewClick, 
  selectShadow 
}) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, height: '100%', alignItems: 'center', flexWrap: 'wrap' }}>
      <Input
        placeholder="Search indicators (e.g. CPI)..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setPage(0);
        }}
        sx={{ flexGrow: 1, minWidth: 250 }}
      />
      <FormControl
        sx={{
          minWidth: 150,
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
            boxShadow: selectShadow,
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
          },
        }}
      >
        <Select
          value={frequencyFilter}
          onChange={(e) => {
            setFrequencyFilter(e.target.value);
            setPage(0);
          }}
          displayEmpty
        >
          <MenuItem value="all">All Frequencies</MenuItem>
          <MenuItem value="M">Monthly Data</MenuItem>
          <MenuItem value="A">Annual Data</MenuItem>
        </Select>
      </FormControl>
      <CustomButton
        variant="contained"
        color="primary"
        onClick={handleAddNewClick}
        sx={{ height: 40, px: 3, display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <FiPlus size={16} /> Add Record
      </CustomButton>
    </Box>
  );
};

export default DataFilterBar;
