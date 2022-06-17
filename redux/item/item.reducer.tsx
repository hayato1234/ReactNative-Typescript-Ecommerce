// import * as ActionTypes from "../ActionTypes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fakeStoreApi } from "../../shared/baseUrl";

export interface ItemState {
  isLoading: "idle" | "pending" | "succeeded" | "failed";
  errMsg: string | null;
  items: Item[];
}

export interface ErrorState {}
const initialState = {
  isLoading: "idle",
  errMsg: null,
  items: [],
} as ItemState;

export const fetchItemList = createAsyncThunk("items/fetchItems", async () => {
  // console.log("fetchitem ok called");
  try {
    const response = await fetch(
      fakeStoreApi + "products/category/electronics"
    );
    if (response.ok) {
      // console.log("fetchitem ok" + typeof response);
      return await response.json();
      // return await response.body;
    } else {
      const error = new Error(
        `Error ${response.status}: ${response.statusText}`
      );
      error.message = response.statusText;
      throw error;
    }
  } catch (error: any) {
    failedLoadItems(error);
  }
});

function failedLoadItems(error: { message: String }) {
  return { type: "ITEM_LIST_FAILED", payload: error.message };
}

const ItemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemList.pending, (state, action) => {
        state.isLoading = "pending";
      })
      .addCase(fetchItemList.fulfilled, (state, action) => {
        if (action.payload) {
          const newItems = JSON.parse(JSON.stringify(action.payload));
          state.isLoading = "succeeded";
          state.items = state.items.concat(newItems);
        }
      })
      .addCase(fetchItemList.rejected, (state, action) => {
        state.isLoading = "failed";
        if (action.payload && action.payload instanceof Error) {
          state.errMsg = action.payload.message;
        } else {
          state.errMsg = action.error.toString();
        }
      });
  },
});

export default ItemSlice.reducer;
