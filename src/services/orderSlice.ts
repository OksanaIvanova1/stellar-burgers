import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TOrder, TOrdersData } from '@utils-types';
import { RootState } from './store';

export const orderBurger = createAsyncThunk(
  'order/create',
  async (items: string[]) => {
    const data = await orderBurgerApi(items);
    return data;
  }
);

export const getOrderByNumber = createAsyncThunk(
  'order/get',
  async (orderID: number) => {
    const data = await getOrderByNumberApi(orderID);
    return data;
  }
);

export type TOrderState = {
  neworder: TOrder | null;
  newOrderIsLoading: boolean;
  newOrderError: string | null;
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  neworder: null,
  newOrderIsLoading: false,
  newOrderError: null,
  order: null,
  isLoading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.neworder = null;
    }
  },
  selectors: {
    selectNewOrder: (state) => state.neworder,
    selectNewOrderIsLoading: (state) => state.newOrderIsLoading,
    selectOrder: (state) => state.order,
    selectIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.newOrderIsLoading = true;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.newOrderIsLoading = false;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.newOrderIsLoading = false;
        state.neworder = action.payload.order;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload.orders[0];
      });
  }
});

export const ordersInfoDataSelector =
  (number: string) => (state: RootState) => {
    if (state.orders.orders.length) {
      const orders = state.feeds.orders.find((item) => item.number === +number);
      if (orders) return orders;
    }
    if (state.feeds.orders.length) {
      const orders = state.orders.orders.find(
        (item) => item.number === +number
      );
      if (orders) return orders;
    }
    if (state.order.order?.number === +number) {
      return state.order.order;
    }

    return null;
  };

export const orderSliceReducer = orderSlice.reducer;
export const orderSliceSelectors = orderSlice.selectors;
export const orderSliceActions = orderSlice.actions;
