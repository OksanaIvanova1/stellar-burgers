import { getIngredients, ingredientsSliceReducer } from './ingredientsSlice';
import { TIngredient } from '@utils-types';

describe('ingredientsSlice', () => {
  const initialState = {
    ingredients: [],
    isLoading: false,
    error: null
  };

  test('should handle getIngredients.pending', () => {
    const actualState = ingredientsSliceReducer(
      initialState,
      getIngredients.pending('')
    );
    expect(actualState).toEqual({
      ingredients: [],
      isLoading: true,
      error: null
    });
  });

  test('should handle getIngredients.fulfilled', () => {
    const ingredients: TIngredient[] = [
      {
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
      },
      {
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
      }
    ];

    const newState = ingredientsSliceReducer(
      initialState,
      getIngredients.fulfilled(ingredients, '')
    );
    expect(newState).toEqual({ ingredients, isLoading: false, error: null });
  });

  test('should handle getIngredients.rejected', () => {
    const error = new Error('Test error');
    const newState = ingredientsSliceReducer(
      initialState,
      getIngredients.rejected(error, '')
    );
    expect(newState).toEqual({
      ingredients: [],
      isLoading: false,
      error: error.message
    });
  });
});
