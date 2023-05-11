import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  flavors: [],
  status: 'idle',
  error: null
};

const flavorSlice = createSlice({
  name: 'flavor',
  initialState,
  reducers: {
    fetchFlavorsStart: (state) => {
      state.status = 'loading';
    },
    fetchFlavorsSuccess: (state, action) => {
        state.status = 'succeeded';
        state.flavors = action.payload.data;
    },
    fetchFlavorsError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    }
  }
});

export default flavorSlice.reducer;

export const { fetchFlavorsStart, fetchFlavorsSuccess, fetchFlavorsError } = flavorSlice.actions;

export const fetchFlavors = () => async (dispatch) => {
  dispatch(fetchFlavorsStart());

  try {
    const response = await axios.get('http://localhost:1337/api/pizza-flavors?populate=*');
    dispatch(fetchFlavorsSuccess(response.data));
  } catch (error) {
    dispatch(fetchFlavorsError(error.message));
  }
};
