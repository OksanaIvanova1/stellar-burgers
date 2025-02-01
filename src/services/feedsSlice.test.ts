import { getFeeds, TFeedsState } from './feedsSlice';
import { feedsSliceReducer } from './feedsSlice';

describe('feedsSlice', () => {
  const initialState: TFeedsState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: false,
    error: null
  };

  test('should handle getFeeds.pending', () => {
    const actualState = feedsSliceReducer(initialState, getFeeds.pending(''));
    expect(actualState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: true,
      error: null
    });
  });

  test('should handle getFeeds.fulfilled', () => {
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
    const total = 1;
    const totalToday = 1;

    const feedsResponse = {
      success: true,
      orders,
      total,
      totalToday
    };

    const newState = feedsSliceReducer(
      initialState,
      getFeeds.fulfilled(feedsResponse, '')
    );
    expect(newState).toEqual({
      orders,
      total,
      totalToday,
      isLoading: false,
      error: null
    });
  });

  test('should handle getFeeds.rejected', () => {
    const error = new Error('Test error');

    const newState = feedsSliceReducer(
      initialState,
      getFeeds.rejected(error, '')
    );
    expect(newState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      error: error.message,
      isLoading: false
    });
  });
});
