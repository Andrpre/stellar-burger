import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';
import { TNewOrderResponse, orderBurgerApi } from '../utils/burger-api';
import { clearBurgerConstructor } from './burgerConstructor';

interface orderState {
  info: TOrder | null;
  status: RequestStatus;
}

const initialState: orderState = {
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

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearInfo: (state) => {
      state.info = null;
    }
  },
  selectors: {
    selectStatus: (sliceState: orderState) => sliceState.status,
    selectInfo: (sliceState: orderState) => sliceState.info
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
      });
  }
});

export const { selectStatus, selectInfo } = orderSlice.selectors;
export const { clearInfo } = orderSlice.actions;
