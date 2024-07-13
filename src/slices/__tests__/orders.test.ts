import { configureStore } from '@reduxjs/toolkit';
import {
  ordersSlice,
  selectOrders,
  getOrders,
  OrdersState,
  initialState
} from '../orders';
import { RequestStatus, TOrder } from '@utils-types';
import {} from '../../utils/burger-api';

describe('[ordersSlice] срез отвечающий за работу со всеми заказами', () => {
  const ordersTestResponse: TOrder[] = [
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
  ];

  describe('Тесты асинхронных экшенов', () => {
    it('Проверяем значение loading для свойсвта status при отправке getOrders.pending', () => {
      const action = { type: getOrders.pending.type };
      const state = ordersSlice.reducer(initialState, action);
      expect(state.status).toBe(RequestStatus.Loading);
    });

    it('Обновляем состояние с данными заказа и ставим значение success для свойсвта status при отправке getOrders.fulfilled', () => {
      const expectedState: OrdersState = {
        status: RequestStatus.Success,
        orders: ordersTestResponse
      };
      const actualState = ordersSlice.reducer(
        initialState,
        getOrders.fulfilled(ordersTestResponse, '')
      );
      expect(actualState).toEqual(expectedState);
      expect(actualState.status).toBe(RequestStatus.Success);
    });

    it('Проверяем состояние и ставим значение failed для свойсвта status при отправке getOrders.rejected', () => {
      const expectedState: OrdersState = {
        ...initialState,
        status: RequestStatus.Failed
      };
      const actualState = ordersSlice.reducer(
        initialState,
        getOrders.rejected(new Error('Error'), '')
      );
      expect(actualState).toEqual(expectedState);
      expect(actualState.status).toBe(RequestStatus.Failed);
    });
  });

  describe('Тесты selectors', () => {
    const store = configureStore({
      reducer: {
        orders: ordersSlice.reducer
      }
    });
    it('Тестируем селектор selectOrders для получения текущего статуса', () => {
      const state = store.getState();
      const selectedState = selectOrders(store.getState());

      expect(selectedState).toEqual(state.orders.orders);
    });
  });
});
