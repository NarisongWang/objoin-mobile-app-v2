import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import installationOrderAPI from './installationOrderAPI';
import { getAuth } from 'firebase/auth';

const initialState = {
  installationOrders: [],
  installationOrder: {},
  isLoading: false,
  error: '',
};

export const getInstallationOrders = createAsyncThunk(
  'installationOrder/getInstallationOrders',
  async (_, thunkAPI) => {
    try {
      const token = await getAuth().currentUser.getIdToken();
      const data = await installationOrderAPI.getInstallationOrders(token);
      return data;
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateInstallationOrder = createAsyncThunk(
  'installationOrder/updateInstallationOrder',
  async (update, thunkAPI) => {
    try {
      const token = await getAuth().currentUser.getIdToken();
      return await installationOrderAPI.updateInstallationOrder(update, token);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const installationOrderSlice = createSlice({
  name: 'installationOrder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //reducers for getInstallationOrders
      .addCase(getInstallationOrders.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(getInstallationOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.installationOrders = action.payload;
      })
      .addCase(getInstallationOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default installationOrderSlice.reducer;
