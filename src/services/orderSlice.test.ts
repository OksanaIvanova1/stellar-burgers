import {
  orderBurger,
  getOrderByNumber,
  orderSliceActions,
  orderSliceReducer
} from './orderSlice';
import { TOrderState } from './orderSlice';

describe('orderSlice', () => {
  const initialState: TOrderState = {
    neworder: null,
    newOrderIsLoading: false,
    newOrderError: null,
    order: null,
    isLoading: false,
    error: null
  };

  test('should handle resetOrder', () => {
    const initialState: TOrderState = {
      neworder: {
        _id: '1',
        status: 'pending',
        name: 'Order 1',
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
        number: 1,
        ingredients: ['ingredient1', 'ingredient2']
      },
      newOrderIsLoading: false,
      newOrderError: null,
      order: null,
      isLoading: false,
      error: null
    };

    const newState = orderSliceReducer(
      initialState,
      orderSliceActions.resetOrder()
    );
    expect(newState.neworder).toBeNull();
  });

  test('should handle orderBurger.pending', () => {
    const newState = orderSliceReducer(
      initialState,
      orderBurger.pending('', [''])
    );
    expect(newState).toEqual({
      neworder: null,
      newOrderIsLoading: true,
      newOrderError: null,
      order: null,
      isLoading: false,
      error: null
    });
  });

  test('should handle orderBurger.rejected', () => {
    const error = new Error('Test error');

    const newState = orderSliceReducer(
      initialState,
      orderBurger.rejected(error, '', [''])
    );
    expect(newState).toEqual({
      neworder: null,
      newOrderIsLoading: false,
      newOrderError: null,
      order: null,
      isLoading: false,
      error: null
    });
  });

  test('should handle orderBurger.fulfilled', () => {
    const order1 = {
      _id: '1',
      status: 'pending',
      name: 'Order 1',
      createdAt: '2025-01-01',
      updatedAt: '2025-01-01',
      number: 1,
      ingredients: ['ingredient1', 'ingredient2']
    };

    const newOrderResponse = {
      success: true,
      order: order1,
      name: 'burger'
    };

    const newState = orderSliceReducer(
      initialState,
      orderBurger.fulfilled(newOrderResponse, '', [''])
    );

    expect(newState).toEqual({
      neworder: order1,
      newOrderIsLoading: false,
      newOrderError: null,
      order: null,
      isLoading: false,
      error: null
    });
  });

  test('should handle getOrderByNumber.pending', () => {
    const newState = orderSliceReducer(
      initialState,
      getOrderByNumber.pending('', 1)
    );

    expect(newState).toEqual({
      neworder: null,
      newOrderIsLoading: false,
      newOrderError: null,
      order: null,
      isLoading: true,
      error: null
    });
  });

  test('should handle getOrderByNumber.rejected', () => {
    const error = new Error('Test error');
    const newState = orderSliceReducer(
      initialState,
      getOrderByNumber.rejected(error, '', 1)
    );
    expect(newState).toEqual({
      neworder: null,
      newOrderIsLoading: false,
      newOrderError: null,
      order: null,
      isLoading: false,
      error: null
    });
  });

  test('should handle getOrderByNumber.fulfilled', () => {
    const newState = orderSliceReducer(
      initialState,
      getOrderByNumber.pending('', 1)
    );

    expect(newState).toEqual({
      neworder: null,
      newOrderIsLoading: false,
      newOrderError: null,
      order: null,
      isLoading: true,
      error: null
    });
  });
});
