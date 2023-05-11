import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  deals: [],
  status: 'idle',
  error: null
};

const dealSlice = createSlice({
  name: 'deal',
  initialState,
  reducers: {
    fetchDealsStart: (state) => {
      state.status = 'loading';
    },
    fetchDealsSuccess: (state, action) => {
        state.status = 'succeeded';
        state.deals = action.payload.data;
    },
    fetchDealsError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    }
  }
});

export default dealSlice.reducer;

export const { fetchDealsStart, fetchDealsSuccess, fetchDealsError } = dealSlice.actions;

export const fetchDeals = () => async (dispatch) => {
  dispatch(fetchDealsStart());

  try {
    const response = await axios.get('http://localhost:1337/api/deals?populate=*');
    dispatch(fetchDealsSuccess(response.data));
  } catch (error) {
    dispatch(fetchDealsError(error.message));
  }
};
