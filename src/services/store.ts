import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { ingredientsSlice } from '../slices/ingredients';
import burgerConstructorSlice from '../slices/burgerConstructor';
import orderSlice from '../slices/order';

const rootReducer = {
  //   ingredients: ingredientsSlice,
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  burgerConstructor: burgerConstructorSlice,
  order: orderSlice
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
