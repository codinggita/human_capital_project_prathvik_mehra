import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Fetch global stats for dashboard summary
export const fetchStats = createAsyncThunk('data/fetchStats', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/stats/prices');
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch stats');
  }
});

// Dynamic backend fetcher for massive paginated datasets
export const fetchDataset = createAsyncThunk(
  'data/fetchDataset',
  async ({ endpoint, page, limit, search, sortBy, sortOrder, ...extraParams }, { rejectWithValue }) => {
    try {
      // Construct dynamic URI
      let query = `${endpoint}?page=${page + 1}&limit=${limit}`; // MongoDB APIs typically 1-index pages
      if (search) query += `&search=${encodeURIComponent(search)}`;
      if (sortBy) query += `&sort=${sortBy}&order=${sortOrder}`;

      // Dynamically append any extra filters passed down
      Object.entries(extraParams).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
          query += `&${key}=${encodeURIComponent(val)}`;
        }
      });

      const response = await api.get(query);
      return {
        data: response.data.data,
        pagination: response.data.pagination,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch dataset');
    }
  }
);

// Create new price record
export const createPrice = createAsyncThunk(
  'data/createPrice',
  async (recordData, { rejectWithValue }) => {
    try {
      const response = await api.post('/prices', recordData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create record');
    }
  }
);

// Update existing price record
export const updatePrice = createAsyncThunk(
  'data/updatePrice',
  async ({ id, recordData }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/prices/${id}`, recordData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update record');
    }
  }
);

// Delete price record
export const deletePrice = createAsyncThunk(
  'data/deletePrice',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/prices/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete record');
    }
  }
);

const initialState = {
  analyticsData: null,

  // Data Grid Pagination State
  dataset: [],
  totalRecords: 0,

  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Stats
      .addCase(fetchStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.loading = false;
        state.analyticsData = action.payload;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Massive Dataset (Paginated)
      .addCase(fetchDataset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataset.fulfilled, (state, action) => {
        state.loading = false;
        state.dataset = action.payload.data || [];
        state.totalRecords = action.payload.pagination?.totalRecords || action.payload.pagination?.total || action.payload.data?.length || 0;
      })
      .addCase(fetchDataset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Price
      .addCase(createPrice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPrice.fulfilled, (state, action) => {
        state.loading = false;
        state.dataset = [action.payload, ...state.dataset];
        state.totalRecords += 1;
      })
      .addCase(createPrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Price
      .addCase(updatePrice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePrice.fulfilled, (state, action) => {
        state.loading = false;
        state.dataset = state.dataset.map((item) =>
          (item._id === action.payload._id || item.id === action.payload.id) ? action.payload : item
        );
      })
      .addCase(updatePrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Price
      .addCase(deletePrice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePrice.fulfilled, (state, action) => {
        state.loading = false;
        state.dataset = state.dataset.filter(
          (item) => item._id !== action.payload && item.id !== action.payload
        );
        state.totalRecords = Math.max(0, state.totalRecords - 1);
      })
      .addCase(deletePrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dataSlice.reducer;
