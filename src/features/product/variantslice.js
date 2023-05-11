import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  variants: [],
  status: 'idle',
  error: null
};

const variantSlice = createSlice({
  name: 'variant',
  initialState,
  reducers: {
    fetchVariantsStart: (state) => {
      state.status = 'loading';
    },
    fetchVariantsSuccess: (state, action) => {
        state.status = 'succeeded';
        state.variants = action.payload.data;
    },
    fetchVariantsError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    }
  }
});

export default variantSlice.reducer;

export const { fetchVariantsStart, fetchVariantsSuccess, fetchVariantsError } = variantSlice.actions;

export const fetchVariants = () => async (dispatch) => {
  dispatch(fetchVariantsStart());

  try {
    const response = await axios.get('http://localhost:1337/api/variants?populate=*');
    dispatch(fetchVariantsSuccess(response.data));
  } catch (error) {
    dispatch(fetchVariantsError(error.message));
  }
};
