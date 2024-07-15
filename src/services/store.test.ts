import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { ingredientsSlice } from '../slices/ingredients';
import { burgerConstructorSlice } from '../slices/burgerConstructor';
import { orderSlice } from '../slices/order';
import { userSlice } from '../slices/user';
import { feedSlice } from '../slices/feed';
import { ordersSlice } from '../slices/orders';

import store from './store';

describe('Инициализация rootReducer', () => {
  const rootReducer = combineReducers({
    [ingredientsSlice.name]: ingredientsSlice.reducer,
    [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
    [orderSlice.name]: orderSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [feedSlice.name]: feedSlice.reducer,
    [ordersSlice.name]: ordersSlice.reducer
  });

  const testStore = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production'
  });

  const state = testStore.getState();
  it('Инициализируем хранилище с правильными редукторами', () => {
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
  it('Возвращает начальное состояние при undefined state и неизвестном действии', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };

    const initialState = {
      [ingredientsSlice.name]: ingredientsSlice.getInitialState(),
      [burgerConstructorSlice.name]: burgerConstructorSlice.getInitialState(),
      [orderSlice.name]: orderSlice.getInitialState(),
      [userSlice.name]: userSlice.getInitialState(),
      [feedSlice.name]: feedSlice.getInitialState(),
      [ordersSlice.name]: ordersSlice.getInitialState()
    };

    // Прямой вызов rootReducer с undefined state и неизвестным action
    const resultState = rootReducer(undefined, unknownAction);

    expect(resultState).toEqual(initialState);
  });
});
