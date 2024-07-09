import { expect, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import {
  feedSlice,
  getFeeds,
  selectOrders,
  selectFeed,
  getStatusRequest
} from '../feed';
import { TFeedsResponse } from '../../utils/burger-api';
import { RequestStatus, TOrder } from '@utils-types';

// Mock API function
jest.mock('../../utils/burger-api', () => ({
  getFeedsApi: jest.fn()
}));

const { getFeedsApi } = require('../../utils/burger-api');

describe('[feedSlice] срез отвечающий за работу истории всех заказов', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    status: RequestStatus.Idle
  };

  describe('Тесты асинхронных экшенов', () => {
    it('Проверяем ожидающее состояние getFeeds', () => {
      const action = { type: getFeeds.pending.type };
      const state = feedSlice.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        status: RequestStatus.Loading
      });
    });

    it('Проверяем выполненное состояние getFeeds', () => {
      const payload: TFeedsResponse = {
        orders: [
          {
            _id: '668d3ae1119d45001b4f579c',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Флюоресцентный люминесцентный бургер',
            createdAt: '2024-07-09T13:28:01.874Z',
            updatedAt: '2024-07-09T13:28:02.254Z',
            number: 45306
          },
          {
            _id: '668d3acb119d45001b4f579b',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa0946',
              '643d69a5c3f7b9001cfa0946',
              '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Флюоресцентный минеральный люминесцентный био-марсианский бургер',
            createdAt: '2024-07-09T13:27:39.223Z',
            updatedAt: '2024-07-09T13:27:39.720Z',
            number: 45305
          }
        ] as TOrder[],
        total: 100,
        totalToday: 10,
        success: true
      };
      const action = { type: getFeeds.fulfilled.type, payload };
      const state = feedSlice.reducer(initialState, action);

      expect(state).toEqual({
        orders: payload.orders,
        total: payload.total,
        totalToday: payload.totalToday,
        status: RequestStatus.Success
      });
    });

    it('Проверяем отклоненное состояние getFeeds', () => {
      const action = { type: getFeeds.rejected.type };
      const state = feedSlice.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        status: RequestStatus.Failed
      });
    });

    it('Диспачим getFeeds и проверяем успешный ответ', async () => {
      const store = configureStore({
        reducer: {
          feed: feedSlice.reducer
        }
      });

      const mockResponse: TFeedsResponse = {
        orders: [
          {
            _id: '668d3ae1119d45001b4f579c',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Флюоресцентный люминесцентный бургер',
            createdAt: '2024-07-09T13:28:01.874Z',
            updatedAt: '2024-07-09T13:28:02.254Z',
            number: 45306
          },
          {
            _id: '668d3acb119d45001b4f579b',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa0946',
              '643d69a5c3f7b9001cfa0946',
              '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Флюоресцентный минеральный люминесцентный био-марсианский бургер',
            createdAt: '2024-07-09T13:27:39.223Z',
            updatedAt: '2024-07-09T13:27:39.720Z',
            number: 45305
          }
        ] as TOrder[],
        total: 100,
        totalToday: 10,
        success: true
      };

      getFeedsApi.mockResolvedValueOnce(mockResponse);

      await store.dispatch(getFeeds());

      const state = store.getState().feed;
      expect(state.status).toBe(RequestStatus.Success);
      expect(state.orders).toEqual(mockResponse.orders);
      expect(state.total).toBe(mockResponse.total);
      expect(state.totalToday).toBe(mockResponse.totalToday);
    });

    it('Диспачим getFeeds и проверяем ответ с ошибкой', async () => {
      const store = configureStore({
        reducer: {
          feed: feedSlice.reducer
        }
      });

      getFeedsApi.mockRejectedValueOnce(new Error('Failed to fetch'));

      await store.dispatch(getFeeds());

      const state = store.getState().feed;
      expect(state.status).toBe(RequestStatus.Failed);
    });
  });

  describe('Тесты selectors', () => {
    it('Тестируем селектор selectOrders для получения всех заказов', () => {
      const store = configureStore({
        reducer: {
          feed: feedSlice.reducer
        }
      });

      const state = store.getState();
      const selectedState = selectOrders(store.getState());

      expect(selectedState).toEqual(state.feed.orders);
    });

    it('Тестируем селектор selectFeed для получения всего состояния', () => {
      const store = configureStore({
        reducer: {
          feed: feedSlice.reducer
        }
      });

      const state = store.getState();
      const selectedState = selectFeed(store.getState());

      expect(selectedState).toEqual(state.feed);
    });

    it('Тестируем селектор getStatusRequest для получения текущего статуса', () => {
      const store = configureStore({
        reducer: {
          feed: feedSlice.reducer
        }
      });

      const state = store.getState();
      const selectedState = getStatusRequest(store.getState());

      expect(selectedState).toEqual(state.feed.status);
    });
  });
});
