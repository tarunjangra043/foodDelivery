import { createSlice } from "@reduxjs/toolkit";
import { food_list } from "../assets/assets.js";

const initialState = {
  cartItems: {},
  food_list: food_list,
  totalPrice: 0,
};

const calculateTotalPrice = (cartItems, food_list) => {
  return food_list.reduce((total, item) => {
    if (cartItems[item._id]) {
      total += item.price * cartItems[item._id];
    }
    return total;
  }, 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemId = action.payload;
      if (!state.cartItems[itemId]) {
        state.cartItems[itemId] = 1;
      } else {
        state.cartItems[itemId]++;
      }
      state.totalPrice = calculateTotalPrice(state.cartItems, state.food_list);
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      if (state.cartItems[itemId]) {
        state.cartItems[itemId]--;
        if (state.cartItems[itemId] === 0) {
          delete state.cartItems[itemId];
        }
      }
      state.totalPrice = calculateTotalPrice(state.cartItems, state.food_list);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
