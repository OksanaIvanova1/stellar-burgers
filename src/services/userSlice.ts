import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

export const getUser = createAsyncThunk('user/get', async () => {
  const data = await getUserApi();
  return data;
});

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ email, name, password }: TRegisterData) => {
    const data = await registerUserApi({ email, name, password });
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  const data = await logoutApi();
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
});

export const updateUser = createAsyncThunk(
  'user/update',
  async ({ email, name, password }: TRegisterData) =>
    await updateUserApi({ email, name, password })
);

type TUserState = {
  isAuthChecked: boolean;
  user: TUser | null;
  error: string | null;
};

const initialState: TUserState = {
  isAuthChecked: false,
  user: null,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authCheck: (state) => {
      state.isAuthChecked = true;
    }
  },
  selectors: {
    selectUser: (state: TUserState) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isAuthChecked = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(registerUser.pending, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isAuthChecked = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.pending, (state) => {
        state.isAuthChecked = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.error = action.error.message as string;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(logoutUser.pending, (state) => {
        state.error = null;
        state.isAuthChecked = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isAuthChecked = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.error = null;
        state.isAuthChecked = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isAuthChecked = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      });
  }
});

export const userSliceReducer = userSlice.reducer;
export const userSliceSelectors = userSlice.selectors;
export const userSliceActions = userSlice.actions;
