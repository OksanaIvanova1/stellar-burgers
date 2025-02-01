import {
  burgerConstructorSliceReducer,
  burgerConstructorSliceActions
} from './burgerConstructorSlice';
import { TConstructorIngredient } from '@utils-types';

describe('burgerConstructorSlice', () => {
  const ingredient1: TConstructorIngredient = {
    id: '1',
    _id: '1',
    name: 'ingredient1',
    type: 'main',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 100,
    price: 50,
    image: 'image-url',
    image_mobile: 'image-mobile-url',
    image_large: 'image-large-url'
  };

  const ingredient2: TConstructorIngredient = {
    id: '2',
    _id: '2',
    name: 'ingredient2',
    type: 'main',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 100,
    price: 50,
    image: 'image-url',
    image_mobile: 'image-mobile-url',
    image_large: 'image-large-url'
  };

  const bun1: TConstructorIngredient = {
    id: '3',
    _id: '3',
    name: 'bun',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 100,
    price: 50,
    image: 'image-url',
    image_mobile: 'image-mobile-url',
    image_large: 'image-large-url'
  };

  test('should addIngredient (bun)', () => {
    const initialState = {
      bun: null,
      ingredients: []
    };

    const newState = burgerConstructorSliceReducer(
      initialState,
      burgerConstructorSliceActions.addIngredient(bun1)
    );
    expect(newState.bun).toEqual({
      ...bun1,
      id: expect.any(String)
    });
    expect(newState.ingredients).toHaveLength(0);
  });

  test('should addIngredient (not bun)', () => {
    const initialState = {
      bun: null,
      ingredients: []
    };
    const newState = burgerConstructorSliceReducer(
      initialState,
      burgerConstructorSliceActions.addIngredient(ingredient1)
    );

    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toEqual({
      ...ingredient1,
      id: expect.any(String)
    });
  });

  test('should removeIngredient', () => {
    const initialState = {
      bun: null,
      ingredients: [ingredient1]
    };
    const action = burgerConstructorSliceActions.removeIngredient(
      ingredient1.id
    );
    const state = burgerConstructorSliceReducer(initialState, action);
    expect(state.ingredients).toEqual([]);
  });

  test('should moveIngredientUp', () => {
    const initialStateWithIngredients = {
      bun: null,
      ingredients: [ingredient1, ingredient2]
    };
    const action = burgerConstructorSliceActions.moveIngredientUp(1);
    const state = burgerConstructorSliceReducer(
      initialStateWithIngredients,
      action
    );
    expect(state.ingredients).toEqual([ingredient2, ingredient1]);
  });

  test('should moveIngredientDown', () => {
    const initialStateWithIngredients = {
      bun: null,
      ingredients: [ingredient1, ingredient2]
    };
    const action = burgerConstructorSliceActions.moveIngredientDown(0);
    const state = burgerConstructorSliceReducer(
      initialStateWithIngredients,
      action
    );
    expect(state.ingredients).toEqual([ingredient2, ingredient1]);
  });
});
