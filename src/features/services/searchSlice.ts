import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { SearchState } from './SearchState';
import searchApi from './searchApi';


const initialState: SearchState = {
  resData: {},
  renderCount: 0,
  status: 'initial',
};

export const fetchAsync = createAsyncThunk(
  'counter/fetchAsync',
  async (searchTerm: string) => {
    const response = await searchApi(searchTerm);
    return response.data;
  }
);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchNext: (state) => {
      state.renderCount += 10;
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.renderCount = 10;
        state.resData = action.payload;
      })
      .addCase(fetchAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { searchNext } = searchSlice.actions;
export const selectData = (state: RootState) => state.search.resData.results;
export const selectCurrentData = (state: RootState) => state.search.resData.results.slice(0, state.search.renderCount - 1);

export default searchSlice.reducer;
