import * as ActionTypes from "../ActionTypes";
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
  return { type: ActionTypes.ITEM_LIST_FAILED, payload: error.message };
}

const ItemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    // loading({ isLoading, errMsg, items }: ItemState) {
    //   isLoading = "pending";
    //   errMsg = null;
    //   items = [];
    // },
    // load(
    //   { isLoading, errMsg, items }: ItemState,
    //   action: PayloadAction<Item[]>
    // ) {
    //   const itemBeingAdded = action.payload;
    //   isLoading = "succeeded";
    //   errMsg = null;
    //   items.concat(itemBeingAdded);
    // },
    // failed({ isLoading, errMsg }: ItemState, action: PayloadAction<string>) {
    //   isLoading = "failed";
    //   errMsg = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemList.pending, (state, action) => {
        state.isLoading = "pending";
      })
      .addCase(fetchItemList.fulfilled, (state, action) => {
        if (action.payload) {
          // const a = action.payload.map((a: any) => a);
          // console.log(
          //   "fetchitem builder ok " +
          //     typeof JSON.parse(JSON.stringify(action.payload))
          // );
          const newItems = JSON.parse(JSON.stringify(action.payload));
          state.items = state.items.concat(newItems);
          state.isLoading = "succeeded";
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

// export const { loading, load, failed } = ItemSlice.actions;
export default ItemSlice.reducer;
