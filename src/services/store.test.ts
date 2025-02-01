import { rootReducer } from './store';
import { ingredientsSliceReducer } from './ingredientsSlice';
import { feedsSliceReducer } from './feedsSlice';
import { burgerConstructorSliceReducer } from './burgerConstructorSlice';
import { ordersSliceReducer } from './ordersSlice';
import { orderSliceReducer } from './orderSlice';
import { userSliceReducer } from './userSlice';
import store from './store';

describe('rootReducer', () => {
  test('Инициализация rootReducer', () => {
    const initAction = { type: '@@INIT' };
    const initialState = store.getState();
    const state = rootReducer(undefined, initAction);
    expect(state).toEqual(initialState);
  });
});
