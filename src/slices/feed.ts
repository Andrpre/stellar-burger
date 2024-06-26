import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';
import { TFeedsResponse, getFeedsApi } from '../utils/burger-api';

interface feedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  status: RequestStatus;
}

const initialState: feedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: RequestStatus.Idle
};

export const getFeeds = createAsyncThunk('feeds/getAll', async () =>
  getFeedsApi()
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (sliceState: feedState) => sliceState.orders,
    selectFeed: (sliceState: feedState) => sliceState,
    getStatusRequest: (sliceState: feedState) => sliceState.status
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(
        getFeeds.fulfilled,
        (state, { payload }: PayloadAction<TFeedsResponse>) => {
          state.status = RequestStatus.Success;
          state.orders = payload.orders;
          state.total = payload.total;
          state.totalToday = payload.totalToday;
        }
      )
      .addCase(getFeeds.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  }
});

export const { selectOrders, selectFeed, getStatusRequest } =
  feedSlice.selectors;
