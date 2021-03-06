import { configureStore } from "@reduxjs/toolkit";
import itemReducer, { ItemState } from "./item/item.reducer";

export interface AppState {
  item: ItemState;
}
export const store = configureStore({
  reducer: {
    item: itemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
