import { expect, describe } from '@jest/globals';
import {
  burgerConstructorSlice,
  addIngredientToOrder,
  removeIngredientFromOrder,
  moveIngredientArrayUp,
  moveIngredientArrayDown,
  clearBurgerConstructor,
  selectState
} from '../burgerConstructor';
import { configureStore } from '@reduxjs/toolkit';

describe('[burgerConstructorSlice] срез отвечающий за работу конструктора бургера', () => {
  // начальное состояние, которое будем менять в тестах
  const initialState = {
    ingredients: [],
    bun: null
  };

  describe('Тесты reducers', () => {
    const stateWithIngredients = {
      bun: null,
      ingredients: [
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
          image_large:
            'https://code.s3.yandex.net/react/code/meat-01-large.png',
          __v: 0,
          id: '9da49e27-e5ea-42d7-b521-aa1ffeb74962'
        },
        {
          _id: '643d69a5c3f7b9001cfa093e',
          name: 'Филе Люминесцентного тетраодонтимформа',
          type: 'main',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-03-large.png',
          __v: 0,
          id: 'dfb56209-bebc-4272-a1f7-23727d993134'
        }
      ]
    };

    it('Добавить булку в конструктор', () => {
      const bun = {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        __v: 0,
        id: '3208b522-f6f2-4f8a-8aed-22456fa1c230'
      };
      const action = addIngredientToOrder(bun);
      const newState = burgerConstructorSlice.reducer(initialState, action);

      expect(newState).toEqual({
        bun: action.payload,
        ingredients: []
      });
    });

    it('Добавить ингредиент в конструктор', () => {
      const ingredient = {
        _id: '643d69a5c3f7b9001cfa0948',
        name: 'Кристаллы марсианских альфа-сахаридов',
        type: 'main',
        proteins: 234,
        fat: 432,
        carbohydrates: 111,
        calories: 189,
        price: 762,
        image: 'https://code.s3.yandex.net/react/code/core.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/core-large.png'
      };
      const action = addIngredientToOrder(ingredient);
      const newState = burgerConstructorSlice.reducer(initialState, action);

      expect(newState.ingredients.length).toBe(1);
      expect(newState.ingredients[0]).toEqual(action.payload);
      expect(newState.bun).toBeNull();
    });

    it('Удалить ингредиент из конструктора', () => {
      const action = removeIngredientFromOrder(
        stateWithIngredients.ingredients[0]
      );
      const newState = burgerConstructorSlice.reducer(
        stateWithIngredients,
        action
      );

      expect(newState.ingredients.length).toBe(1);
      expect(newState.ingredients[0].id).toBe(
        'dfb56209-bebc-4272-a1f7-23727d993134'
      );
    });

    it('Перемещаем ингредиент вверх', () => {
      const action = moveIngredientArrayUp(1);
      const newState = burgerConstructorSlice.reducer(
        stateWithIngredients,
        action
      );

      expect(newState.ingredients[0].id).toBe(
        'dfb56209-bebc-4272-a1f7-23727d993134'
      );
      expect(newState.ingredients[1].id).toBe(
        '9da49e27-e5ea-42d7-b521-aa1ffeb74962'
      );
    });

    it('Перемещаем ингредиент вниз', () => {
      const action = moveIngredientArrayDown(0);
      const newState = burgerConstructorSlice.reducer(
        stateWithIngredients,
        action
      );

      expect(newState.ingredients[0].id).toBe(
        'dfb56209-bebc-4272-a1f7-23727d993134'
      );
      expect(newState.ingredients[1].id).toBe(
        '9da49e27-e5ea-42d7-b521-aa1ffeb74962'
      );
    });

    it('Очищаем бургер конструктор', () => {
      const action = clearBurgerConstructor();
      const newState = burgerConstructorSlice.reducer(
        stateWithIngredients,
        action
      );

      expect(newState).toEqual(initialState);
    });
  });

  describe('Тесты selectors', () => {
    it('Тестируем селектор selectState для получения текущего состояния', () => {
      const store = configureStore({
        reducer: {
          burgerConstructor: burgerConstructorSlice.reducer
        }
      });

      const state = store.getState();
      const selectedState = selectState(store.getState());

      expect(selectedState).toEqual(state.burgerConstructor);
    });
  });
});
