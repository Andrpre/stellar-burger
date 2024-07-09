import { configureStore } from '@reduxjs/toolkit';

import { ingredientsSlice } from '../slices/ingredients';
import { burgerConstructorSlice } from '../slices/burgerConstructor';
import { orderSlice } from '../slices/order';
import { userSlice } from '../slices/user';
import { feedSlice } from '../slices/feed';
import { ordersSlice } from '../slices/orders';

import store from './store';

describe('Инициализация rootReducer', () => {
  it('Инициализируем хранилище с правильными редукторами', () => {
    const rootReducer = {
      [ingredientsSlice.name]: ingredientsSlice.reducer,
      [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
      [orderSlice.name]: orderSlice.reducer,
      [userSlice.name]: userSlice.reducer,
      [feedSlice.name]: feedSlice.reducer,
      [ordersSlice.name]: ordersSlice.reducer
    };

    const testStore = configureStore({
      reducer: rootReducer,
      devTools: process.env.NODE_ENV !== 'production'
    });

    const state = testStore.getState();

    expect(state).toHaveProperty(ingredientsSlice.name);
    expect(state).toHaveProperty(burgerConstructorSlice.name);
    expect(state).toHaveProperty(orderSlice.name);
    expect(state).toHaveProperty(userSlice.name);
    expect(state).toHaveProperty(feedSlice.name);
    expect(state).toHaveProperty(ordersSlice.name);

    expect(state[ingredientsSlice.name]).toEqual(
      ingredientsSlice.getInitialState()
    );
    expect(state[burgerConstructorSlice.name]).toEqual(
      burgerConstructorSlice.getInitialState()
    );
    expect(state[orderSlice.name]).toEqual(orderSlice.getInitialState());
    expect(state[userSlice.name]).toEqual(userSlice.getInitialState());
    expect(state[feedSlice.name]).toEqual(feedSlice.getInitialState());
    expect(state[ordersSlice.name]).toEqual(ordersSlice.getInitialState());
  });

  it('Используем тот же rootReducer в реальном хранилище', () => {
    const actualState = store.getState();

    expect(actualState).toHaveProperty(ingredientsSlice.name);
    expect(actualState).toHaveProperty(burgerConstructorSlice.name);
    expect(actualState).toHaveProperty(orderSlice.name);
    expect(actualState).toHaveProperty(userSlice.name);
    expect(actualState).toHaveProperty(feedSlice.name);
    expect(actualState).toHaveProperty(ordersSlice.name);

    expect(actualState[ingredientsSlice.name]).toEqual(
      ingredientsSlice.getInitialState()
    );
    expect(actualState[burgerConstructorSlice.name]).toEqual(
      burgerConstructorSlice.getInitialState()
    );
    expect(actualState[orderSlice.name]).toEqual(orderSlice.getInitialState());
    expect(actualState[userSlice.name]).toEqual(userSlice.getInitialState());
    expect(actualState[feedSlice.name]).toEqual(feedSlice.getInitialState());
    expect(actualState[ordersSlice.name]).toEqual(
      ordersSlice.getInitialState()
    );
  });
});
