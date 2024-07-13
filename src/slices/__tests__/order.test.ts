import { configureStore } from '@reduxjs/toolkit';
import {
  orderSlice,
  createOrder,
  getOrder,
  selectStatus,
  selectInfo,
  clearInfo,
  OrderState,
  initialState
} from '../order';
import { RequestStatus, TOrder } from '@utils-types';
import { TNewOrderResponse, TOrderResponse } from '../../utils/burger-api';

describe('[orderSlice] срез отвечающий за работу с одним заказом', () => {
  const orderTestResponse: TOrderResponse = {
    success: true,
    orders: [
      {
        _id: '668e1578119d45001b4f7c66',
        ingredients: ['643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa093d'],
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2024-07-10T05:00:40.605Z',
        updatedAt: '2024-07-10T05:00:41.027Z',
        number: 45337
      },
      {
        _id: '6676d059856777001bb1ce76',
        ingredients: ['643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa093d'],
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2024-06-22T13:23:37.283Z',
        updatedAt: '2024-06-22T13:23:37.698Z',
        number: 43825
      }
    ]
  };

  const newOrderTestResponse: TNewOrderResponse = {
    order: orderTestResponse.orders[0] as TOrder,
    name: '',
    success: true
  };

  describe('Тесты reducers', () => {
    const stateWithInfo = {
      info: orderTestResponse.orders[0] as TOrder,
      status: RequestStatus.Success
    };
    it('Очищаем информацию о заказе', () => {
      const action = clearInfo();
      const state = orderSlice.reducer(stateWithInfo, action);
      expect(state.info).toBeNull();
    });
  });

  describe('Тесты асинхронных экшенов', () => {
    it('Проверяем значение loading для свойсвта status при отправке createOrder.pending', () => {
      const action = { type: createOrder.pending.type };
      const state = orderSlice.reducer(initialState, action);
      expect(state.status).toBe(RequestStatus.Loading);
    });

    it('Обновляем состояние с данными заказа и ставим значение success для свойсвта status при отправке createOrder.fulfilled', () => {
      const expectedState: OrderState = {
        status: RequestStatus.Success,
        info: orderTestResponse.orders[0]
      };
      const actualState = orderSlice.reducer(
        initialState,
        createOrder.fulfilled(newOrderTestResponse, '', [])
      );
      expect(actualState).toEqual(expectedState);
      expect(actualState.status).toBe(RequestStatus.Success);
    });

    it('Проверяем состояние и ставим значение failed для свойсвта status при отправке createOrder.rejected', () => {
      const expectedState: OrderState = {
        ...initialState,
        status: RequestStatus.Failed
      };
      const actualState = orderSlice.reducer(
        initialState,
        createOrder.rejected(new Error('Error'), '', [])
      );
      expect(actualState).toEqual(expectedState);
      expect(actualState.status).toBe(RequestStatus.Failed);
    });

    it('Ставим значение loading для свойсвта status при отправке getOrder.pending', () => {
      const action = { type: getOrder.pending.type };
      const state = orderSlice.reducer(initialState, action);
      expect(state.status).toBe(RequestStatus.Loading);
    });

    it('Обновляем состояние с данными заказа и ставим значение success для свойсвта status при отправке getOrder.fulfilled', () => {
      const expectedState: OrderState = {
        status: RequestStatus.Success,
        info: orderTestResponse.orders[0]
      };
      const actualState = orderSlice.reducer(
        initialState,
        getOrder.fulfilled(orderTestResponse, '', 0)
      );
      expect(actualState).toEqual(expectedState);
      expect(actualState.status).toBe(RequestStatus.Success);
    });

    it('Проверяем состояние и ставим значение failed для свойсвта status при отправке getOrder.rejected', () => {
      const expectedState: OrderState = {
        ...initialState,
        status: RequestStatus.Failed
      };
      const actualState = orderSlice.reducer(
        initialState,
        getOrder.rejected(new Error('Error'), '', 0)
      );
      expect(actualState).toEqual(expectedState);
      expect(actualState.status).toBe(RequestStatus.Failed);
    });
  });

  describe('Тесты selectors', () => {
    const store = configureStore({
      reducer: {
        order: orderSlice.reducer
      }
    });
    it('Тестируем селектор selectStatus для получения текущего статуса', () => {
      const state = store.getState();
      const selectedState = selectStatus(store.getState());

      expect(selectedState).toEqual(state.order.status);
    });

    it('Тестируем селектор selectInfo для получения информации о заказе', () => {
      const state = store.getState();
      const selectedState = selectInfo(store.getState());

      expect(selectedState).toEqual(state.order.info);
    });
  });
});
