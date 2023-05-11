import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  status: 'idle',
  error: null
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    fetchItemsStart: (state) => {
      state.status = 'loading';
    },
    fetchItemsSuccess: (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.data;
    },
    fetchItemsError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    }
  }
});

export default itemSlice.reducer;

export const { fetchItemsStart, fetchItemsSuccess, fetchItemsError } = itemSlice.actions;

export const fetchItems = () => async (dispatch) => {
  dispatch(fetchItemsStart());

  try {
    const response = await axios.get('http://localhost:1337/api/items/?populate=*');
    dispatch(fetchItemsSuccess(response.data));
  } catch (error) {
    dispatch(fetchItemsError(error.message));
  }
};

export const fetchProductItems = (productId) => async (dispatch) => {
  dispatch(fetchItemsStart());

  try {
    const response = await axios.get(`http://localhost:1337/api/items/${productId}?populate=*`);
    dispatch(fetchItemsSuccess(response.data));
  } catch (error) {
    dispatch(fetchItemsError(error.message));
  }
};

