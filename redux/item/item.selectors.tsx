import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ItemState } from "./item.reducer";

export const itemSelector = (state: RootState) => state.item;
export const getItemsStatus = (state: RootState) => state.item.isLoading;

// export const itemStatusSelector = createSelector(
//   itemSelector,
//   (state) => state.isLoading
// );
