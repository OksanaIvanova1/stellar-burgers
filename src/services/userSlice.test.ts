import { TRegisterData } from '@api';
import {
  getUser,
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  userSliceReducer,
  userSliceActions,
  TUserState
} from './userSlice';

describe('userSlice', () => {
  const initialState = {
    isAuthChecked: false,
    user: null,
    error: null
  };

  const registerData: TRegisterData = {
    email: 'ivanov@mail.ru',
    name: 'Ivan Ivanov',
    password: 'password'
  };

  const userResponse = {
    success: true,
    user: { email: 'ivanov@mail.ru', name: 'Ivan Ivanov', password: 'password' }
  };

  const authResponse = {
    success: false,
    refreshToken: '',
    accessToken: '',
    user: {
      email: 'ivanov@mail.ru',
      name: 'Ivan Ivanov'
    }
  };

  test('should handle authCheck', () => {
    const newState = userSliceReducer(
      initialState,
      userSliceActions.authCheck()
    );
    expect(newState.isAuthChecked).toBe(true); //toEqual
  });

  test('should handle getUser.rejected', () => {
    const error = new Error('Test error');

    const newState = userSliceReducer(
      initialState,
      getUser.rejected(error, '')
    );
    expect(newState).toEqual({
      isAuthChecked: false,
      user: null,
      error: error.message
    });
  });

  test('should handle getUser.fulfilled', () => {
    const newState = userSliceReducer(
      initialState,
      getUser.fulfilled(userResponse, '')
    );
    expect(newState).toEqual({
      ...initialState,
      user: userResponse.user,
      isAuthChecked: true
    });
  });

  test('should handle registerUser.rejected', () => {
    const error = new Error('Test error');

    const newState = userSliceReducer(
      initialState,
      registerUser.rejected(error, '', registerData)
    );
    expect(newState).toEqual({
      isAuthChecked: false,
      user: null,
      error: error.message
    });
  });

  test('should handle registerUser.fulfilled', () => {
    const newState = userSliceReducer(
      initialState,
      registerUser.fulfilled(authResponse, '', registerData)
    );
    expect(newState).toEqual({
      ...initialState,
      user: authResponse.user,
      isAuthChecked: true
    });
  });

  test('should handle loginUser.rejected', () => {
    const error = new Error('Test error');

    const newState = userSliceReducer(
      initialState,
      loginUser.rejected(error, '', registerData)
    );
    expect(newState).toEqual({
      isAuthChecked: true,
      user: null,
      error: error.message
    });
  });

  test('should handle loginUser.fulfilled', () => {
    const newState = userSliceReducer(
      initialState,
      loginUser.fulfilled(authResponse, '', registerData)
    );
    expect(newState).toEqual({
      ...initialState,
      user: authResponse.user,
      isAuthChecked: true
    });
  });

  test('should handle logoutUser.rejected', () => {
    const error = new Error('Test error');

    const newState = userSliceReducer(
      initialState,
      logoutUser.rejected(error, '')
    );
    expect(newState).toEqual({
      isAuthChecked: false,
      user: null,
      error: error.message
    });
  });

  test('should handle logoutUser.fulfilled', () => {
    const initialState = {
      isAuthChecked: false,
      user: {
        email: 'ivanov@mail.ru',
        name: 'Ivan Ivanov'
      },
      error: null
    };

    const newState = userSliceReducer(
      initialState,
      logoutUser.fulfilled(undefined, '')
    );
    expect(newState).toEqual({ isAuthChecked: true, user: null, error: null });
  });

  test('should handle updateUser.rejected', () => {
    const error = new Error('Test error');

    const newState = userSliceReducer(
      initialState,
      updateUser.rejected(error, '', registerData)
    );
    expect(newState).toEqual({
      isAuthChecked: false,
      user: null,
      error: error.message
    });
  });

  test('should handle updateUser.fulfilled', () => {
    const newState = userSliceReducer(
      initialState,
      updateUser.fulfilled(userResponse, '', registerData)
    );
    expect(newState).toEqual({
      ...initialState,
      user: userResponse.user,
      isAuthChecked: true
    });
  });
});
