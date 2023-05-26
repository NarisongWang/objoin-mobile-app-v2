import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import installationOrderAPI from './installationOrderAPI';
import { initFiles } from '../../utils/utils';
import { getAuth } from 'firebase/auth';

const initialState = {
  installationOrders: [],
  installationOrder: {},
  files: [],
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

//get installation order and only update installationOrder state
export const getInstallationOrder1 = createAsyncThunk(
  'installationOrder/getInstallationOrder1',
  async (installationOrderId, thunkAPI) => {
    try {
      const token = await getAuth().currentUser.getIdToken();
      return await installationOrderAPI.getInstallationOrder(
        installationOrderId,
        token
      );
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get installation order, then update installationOrder and files state
export const getInstallationOrder2 = createAsyncThunk(
  'installationOrder/getInstallationOrder2',
  async (installationOrderId, thunkAPI) => {
    try {
      const token = await getAuth().currentUser.getIdToken();
      return await installationOrderAPI.getInstallationOrder(
        installationOrderId,
        token
      );
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

export const submitOrder = createAsyncThunk(
  'installationOrder/submitOrder',
  async (orderInfo, thunkAPI) => {
    try {
      const token = await getAuth().currentUser.getIdToken();
      return await installationOrderAPI.submitOrder(orderInfo, token);
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
      })
      //reducers for getInstallationOrder1
      .addCase(getInstallationOrder1.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(getInstallationOrder1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.installationOrder = action.payload;
      })
      .addCase(getInstallationOrder1.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //reducers for getInstallationOrder2
      .addCase(getInstallationOrder2.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(getInstallationOrder2.fulfilled, (state, action) => {
        state.isLoading = false;
        state.installationOrder = action.payload;
        state.files = initFiles(action.payload.files);
      })
      .addCase(getInstallationOrder2.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //reducers for updateInstallationOrder
      .addCase(updateInstallationOrder.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(updateInstallationOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.installationOrder = action.payload;
      })
      .addCase(updateInstallationOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //reducers for submitOrder
      .addCase(submitOrder.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.installationOrders = action.payload;
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default installationOrderSlice.reducer;
