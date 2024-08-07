import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';
import { getOrdersApi } from '../utils/burger-api';

export interface OrdersState {
  orders: TOrder[];
  status: RequestStatus;
}

export const initialState: OrdersState = {
  orders: [],
  status: RequestStatus.Idle
};

export const getOrders = createAsyncThunk('orders/getMy', async () =>
  getOrdersApi()
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (sliceState: OrdersState) => sliceState.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(
        getOrders.fulfilled,
        (state, { payload }: PayloadAction<TOrder[]>) => {
          state.status = RequestStatus.Success;
          state.orders = payload;
        }
      )
      .addCase(getOrders.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  }
});

export const { selectOrders } = ordersSlice.selectors;
