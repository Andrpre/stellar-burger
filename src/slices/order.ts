import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';
import {
  TNewOrderResponse,
  TOrderResponse,
  getOrderByNumberApi,
  orderBurgerApi
} from '../utils/burger-api';
import { clearBurgerConstructor } from './burgerConstructor';

export interface OrderState {
  info: TOrder | null;
  status: RequestStatus;
}

const initialState: OrderState = {
  info: null,
  status: RequestStatus.Idle
};

export const createOrder = createAsyncThunk(
  'order/create',
  async (id_array: string[], { dispatch }) => {
    dispatch(clearBurgerConstructor());
    const data = await orderBurgerApi(id_array);
    return data;
  }
);

export const getOrder = createAsyncThunk(
  'order/getId',
  async (id_order: number) => {
    const data = await getOrderByNumberApi(id_order);
    return data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearInfo: (state) => {
      state.info = null;
    }
  },
  selectors: {
    selectStatus: (sliceState: OrderState) => sliceState.status,
    selectInfo: (sliceState: OrderState) => sliceState.info
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(
        createOrder.fulfilled,
        (state, { payload }: PayloadAction<TNewOrderResponse>) => {
          state.status = RequestStatus.Success;
          state.info = payload.order;
        }
      )
      .addCase(createOrder.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(getOrder.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(
        getOrder.fulfilled,
        (state, { payload }: PayloadAction<TOrderResponse>) => {
          state.status = RequestStatus.Success;
          state.info = payload.orders[0];
        }
      )
      .addCase(getOrder.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  }
});

export const { selectStatus, selectInfo } = orderSlice.selectors;
export const { clearInfo } = orderSlice.actions;
