import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TBurgerConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveIngredientUp: (state, action) => {
      const index = action.payload;
      if (index > 0) {
        const currentIngredient = state.ingredients[index];
        state.ingredients[index] = state.ingredients[index - 1];
        state.ingredients[index - 1] = currentIngredient;
      }
    },
    moveIngredientDown: (state, action) => {
      const index = action.payload;
      if (index > 0) {
        const currentIngredient = state.ingredients[index];
        state.ingredients[index] = state.ingredients[index + 1];
        state.ingredients[index + 1] = currentIngredient;
      }
    }
  },
  selectors: {
    selectBurgerConstructorState: (state: TBurgerConstructorState) => state
  }
});

export const burgerConstructorSliceReducer = burgerConstructorSlice.reducer;
export const burgerConstructorSliceActions = burgerConstructorSlice.actions;
export const burgerConstructorSliceSelectors = burgerConstructorSlice.selectors;
// export default burgerConstructorSlice;
