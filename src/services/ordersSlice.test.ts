import { ordersSliceReducer, getOrders, TOrdersState } from './ordersSlice';

describe('ordersSlice', () => {
  const initialState: TOrdersState = {
    orders: [],
    isLoading: false,
    error: null
  };

  test('should handle getOrders.pending', () => {
    const actualState = ordersSliceReducer(initialState, getOrders.pending(''));
    expect(actualState).toEqual({
      orders: [],
      isLoading: true,
      error: null
    });
  });

  test('should handle getOrders.fulfilled', () => {
    const orders = [
      {
        _id: '1',
        status: 'pending',
        name: 'Order 1',
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
        number: 1,
        ingredients: ['ingredient1', 'ingredient2']
      }
    ];

    const newState = ordersSliceReducer(
      initialState,
      getOrders.fulfilled(orders, '')
    );
    expect(newState).toEqual({ orders, isLoading: false, error: null });
  });

  test('should handle getOrders.rejected', () => {
    const error = new Error('Test error');

    const newState = ordersSliceReducer(
      initialState,
      getOrders.rejected(error, '')
    );
    expect(newState).toEqual({
      orders: [],
      isLoading: false,
      error: error.message
    });
  });
});
