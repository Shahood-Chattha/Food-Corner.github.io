import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  status: 'idle',
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    fetchProductsStart: (state) => {
      state.status = 'loading';
    },
    fetchProductsSuccess: (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.data;
    },
    fetchProductsError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    }
  }
});

export default productSlice.reducer;

export const { fetchProductsStart, fetchProductsSuccess, fetchProductsError } = productSlice.actions;

export const fetchProducts = () => async (dispatch) => {
  dispatch(fetchProductsStart());

  try {
    const response = await axios.get('http://localhost:1337/api/products?populate=*');
    dispatch(fetchProductsSuccess(response.data));
  } catch (error) {
    dispatch(fetchProductsError(error.message));
  }
};
