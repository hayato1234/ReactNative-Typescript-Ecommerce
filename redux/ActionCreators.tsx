import * as ActionTypes from "./ActionTypes";
import { ITEMS } from "../shared/items";
import { fakeStoreApi } from "../shared/baseUrl";
import { Dispatch } from "@reduxjs/toolkit";

export const fetchItemList = () => (dispatch: any) => {
  console.log("fetch called");
  dispatch(itemListLoading);
  setTimeout(() => {
    dispatch(loadItems(ITEMS));
  }, 1000);
  return fetch(fakeStoreApi + "products/category/electronics")
    .then(
      (response) => {
        if (response.ok) {
          // console.log(response.json());
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.message = response.statusText;
          throw error;
        }
      },
      (error) => {
        //no response
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((items) => dispatch(loadItems(items)))
    .catch((error) => failedLoadItems(error));
};

function itemListLoading() {
  return { type: ActionTypes.ITEM_LIST_LOADING };
}

function loadItems(items: Item[]) {
  return { type: ActionTypes.LOAD_ITEM_LIST, payload: items };
}

function failedLoadItems(error: { message: String }) {
  return { type: ActionTypes.ITEM_LIST_FAILED, payload: error.message };
}

export function addToCart(item: Item) {
  return { type: ActionTypes.ADD_TO_CART, payload: item };
}
