import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import {
  TConstructorIngredient,
  RequestStatus,
  TOrder,
  TIngredient
} from '../utils/types';
import { TNewOrderResponse, orderBurgerApi } from '../utils/burger-api';

interface burgerConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: burgerConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredientToOrder: {
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      }),
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        payload.type === 'bun'
          ? (state.bun = payload)
          : state.ingredients.push(payload);
      }
    },
    removeIngredientFromOrder: (
      state,
      { payload }: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== payload.id
      );
    },
    moveIngredientArrayUp: (state, { payload }: PayloadAction<number>) => {
      [state.ingredients[payload], state.ingredients[payload - 1]] = [
        state.ingredients[payload - 1],
        state.ingredients[payload]
      ];
    },
    moveIngredientArrayDown: (state, { payload }: PayloadAction<number>) => {
      [state.ingredients[payload], state.ingredients[payload + 1]] = [
        state.ingredients[payload + 1],
        state.ingredients[payload]
      ];
    },
    clearBurgerConstructor: (state) => {
      (state.bun = null), (state.ingredients = []);
    }
  },
  selectors: {
    selectState: (sliceState: burgerConstructorState) => sliceState
  }
});

export const { selectState } = burgerConstructorSlice.selectors;
export const {
  addIngredientToOrder,
  removeIngredientFromOrder,
  moveIngredientArrayUp,
  moveIngredientArrayDown,
  clearBurgerConstructor
} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
