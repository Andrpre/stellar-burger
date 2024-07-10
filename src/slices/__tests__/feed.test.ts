import { configureStore } from '@reduxjs/toolkit';
import {
  feedSlice,
  getFeeds,
  selectOrders,
  selectFeed,
  getStatusRequest,
  FeedState
} from '../feed';
import { TFeedsResponse } from '../../utils/burger-api';
import { RequestStatus, TOrder } from '@utils-types';

describe('[feedSlice] срез отвечающий за работу истории всех заказов', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    status: RequestStatus.Idle
  };

  const feedTestResponseOrders: TOrder[] = [
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
  ] as TOrder[];

  const feedTestResponse: TFeedsResponse = {
    orders: feedTestResponseOrders,
    total: 100,
    totalToday: 10,
    success: true
  };

  describe('Тесты асинхронных экшенов', () => {
    it('Проверяем значение loading для свойсвта status при отправке getFeeds.pending', () => {
      const action = { type: getFeeds.pending.type };
      const state = feedSlice.reducer(initialState, action);
      expect(state.status).toBe(RequestStatus.Loading);
    });

    it('Обновляем состояние с данными заказа и ставим значение success для свойсвта status при отправке getFeeds.fulfilled', () => {
      const expectedState: FeedState = {
        orders: feedTestResponseOrders,
        total: 100,
        totalToday: 10,
        status: RequestStatus.Success
      };
      const actualState = feedSlice.reducer(
        initialState,
        getFeeds.fulfilled(feedTestResponse, '')
      );
      expect(actualState).toEqual(expectedState);
      expect(actualState.status).toBe(RequestStatus.Success);
    });

    it('Проверяем состояние и ставим значение failed для свойсвта status при отправке getFeeds.rejected', () => {
      const expectedState: FeedState = {
        ...initialState,
        status: RequestStatus.Failed
      };
      const actualState = feedSlice.reducer(
        initialState,
        getFeeds.rejected(new Error('Error'), '')
      );
      expect(actualState).toEqual(expectedState);
      expect(actualState.status).toBe(RequestStatus.Failed);
    });
  });

  describe('Тесты selectors', () => {
    const store = configureStore({
      reducer: {
        feed: feedSlice.reducer
      }
    });
    it('Тестируем селектор selectOrders для получения всех заказов', () => {
      const state = store.getState();
      const selectedState = selectOrders(store.getState());

      expect(selectedState).toEqual(state.feed.orders);
    });

    it('Тестируем селектор selectFeed для получения всего состояния', () => {
      const state = store.getState();
      const selectedState = selectFeed(store.getState());

      expect(selectedState).toEqual(state.feed);
    });

    it('Тестируем селектор getStatusRequest для получения текущего статуса', () => {
      const state = store.getState();
      const selectedState = getStatusRequest(store.getState());

      expect(selectedState).toEqual(state.feed.status);
    });
  });
});
