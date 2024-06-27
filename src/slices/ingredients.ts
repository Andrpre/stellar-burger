import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, RequestStatus } from '../utils/types';
import { getIngredientsApi } from '../utils/burger-api';

interface IngredientState {
  data: TIngredient[];
  status: RequestStatus;
}

const initialState: IngredientState = {
  data: [],
  status: RequestStatus.Idle
};

export const getIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients/getAll',
  async () => getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (sliceState: IngredientState) => sliceState.data,
    getLoadIngredients: (sliceState: IngredientState) => sliceState.status
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(
        getIngredients.fulfilled,
        (state, { payload }: PayloadAction<TIngredient[]>) => {
          state.status = RequestStatus.Success;
          state.data = payload;
        }
      )
      .addCase(getIngredients.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  }
});

export const { selectIngredients, getLoadIngredients } =
  ingredientsSlice.selectors;
