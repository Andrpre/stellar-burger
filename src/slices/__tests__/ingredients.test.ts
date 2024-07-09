import { configureStore } from '@reduxjs/toolkit';
import {
  ingredientsSlice,
  getIngredients,
  selectIngredients,
  getLoadIngredients
} from '../ingredients';
import { TIngredient, RequestStatus } from '../../utils/types';
import { getIngredientsApi } from '../../utils/burger-api';

jest.mock('../../utils/burger-api');

describe('[ingredientsSlice] срез отвечающий за работу с ингредиентами', () => {
  const initialState = {
    data: [],
    status: RequestStatus.Idle
  };

  describe('Тесты асинхронных экшенов', () => {
    it('Проверяем ожидающее состояние getIngredients', () => {
      const action = { type: getIngredients.pending.type };
      const state = ingredientsSlice.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        status: RequestStatus.Loading
      });
    });

    it('Проверяем выполненное состояние getIngredients', () => {
      const payload: TIngredient[] = [
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
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
        }
      ] as TIngredient[];
      const action = { type: getIngredients.fulfilled.type, payload };
      const state = ingredientsSlice.reducer(initialState, action);

      expect(state).toEqual({
        data: payload,
        status: RequestStatus.Success
      });
    });
  });

  //   it('should handle rejected state of getIngredients', () => {
  //     const action = { type: getIngredients.rejected.type };
  //     const state = ingredientsSlice.reducer(initialState, action);

  //     expect(state).toEqual({
  //       ...initialState,
  //       status: RequestStatus.Failed
  //     });
  //   });

  //   it('should select ingredients', () => {
  //     const state = {
  //       ingredients: {
  //         ...initialState,
  //         data: [{ id: '1', name: 'Bun' }] as TIngredient[]
  //       }
  //     };
  //     expect(selectIngredients(state.ingredients)).toEqual(
  //       state.ingredients.data
  //     );
  //   });

  //   it('should select load ingredients status', () => {
  //     const state = {
  //       ingredients: {
  //         ...initialState,
  //         status: RequestStatus.Loading
  //       }
  //     };
  //     expect(getLoadIngredients(state.ingredients)).toEqual(
  //       state.ingredients.status
  //     );
  //   });

  //   it('should dispatch getIngredients and handle success', async () => {
  //     const store = configureStore({
  //       reducer: {
  //         ingredients: ingredientsSlice.reducer
  //       }
  //     });

  //     const mockResponse: TIngredient[] = [
  //       { id: '1', name: 'Bun' }
  //     ] as TIngredient[];
  //     (getIngredientsApi as jest.Mock).mockResolvedValueOnce(mockResponse);

  //     await store.dispatch(getIngredients());

  //     const state = store.getState().ingredients;
  //     expect(state.status).toBe(RequestStatus.Success);
  //     expect(state.data).toEqual(mockResponse);
  //   });

  //   it('should dispatch getIngredients and handle failure', async () => {
  //     const store = configureStore({
  //       reducer: {
  //         ingredients: ingredientsSlice.reducer
  //       }
  //     });

  //     (getIngredientsApi as jest.Mock).mockRejectedValueOnce(
  //       new Error('Failed to fetch')
  //     );

  //     await store.dispatch(getIngredients());

  //     const state = store.getState().ingredients;
  //     expect(state.status).toBe(RequestStatus.Failed);
  //   });
});
