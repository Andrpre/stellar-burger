import { configureStore } from '@reduxjs/toolkit';
import {
  ingredientsSlice,
  getIngredients,
  selectIngredients,
  getLoadIngredients,
  IngredientState
} from '../ingredients';
import { TIngredient, RequestStatus } from '../../utils/types';

describe('[ingredientsSlice] срез отвечающий за работу с ингредиентами', () => {
  const initialState = {
    data: [],
    status: RequestStatus.Idle
  };

  const ingredientsTestResponse: TIngredient[] = [
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    }
  ] as TIngredient[];

  describe('Тесты асинхронных экшенов', () => {
    const expectedState: IngredientState = {
      status: RequestStatus.Success,
      data: ingredientsTestResponse
    };
    it('Проверяем значение loading для свойсвта status при отправке getIngredients.pending', () => {
      const action = { type: getIngredients.pending.type };
      const state = ingredientsSlice.reducer(initialState, action);
      expect(state.status).toBe(RequestStatus.Loading);
    });

    it('Обновляем состояние с данными заказа и ставим значение success для свойсвта status при отправке getIngredients.fulfilled', () => {
      const actualState = ingredientsSlice.reducer(
        initialState,
        getIngredients.fulfilled(ingredientsTestResponse, '')
      );
      expect(actualState).toEqual(expectedState);
      expect(actualState.status).toBe(RequestStatus.Success);
    });

    it('Проверяем состояние и ставим значение failed для свойсвта status при отправке getIngredients.rejected', () => {
      const expectedState: IngredientState = {
        ...initialState,
        status: RequestStatus.Failed
      };
      const actualState = ingredientsSlice.reducer(
        initialState,
        getIngredients.rejected(new Error('Error'), '')
      );
      expect(actualState).toEqual(expectedState);
      expect(actualState.status).toBe(RequestStatus.Failed);
    });
  });

  describe('Тесты selectors', () => {
    const store = configureStore({
      reducer: {
        ingredients: ingredientsSlice.reducer
      }
    });
    it('Тестируем селектор selectIngredients для получения всех ингредиентов', () => {
      const state = store.getState();
      const selectedState = selectIngredients(store.getState());

      expect(selectedState).toEqual(state.ingredients.data);
    });

    it('Тестируем селектор getLoadIngredients для получения текущего статуса', () => {
      const state = store.getState();
      const selectedState = getLoadIngredients(store.getState());

      expect(selectedState).toEqual(state.ingredients.status);
    });
  });
});
