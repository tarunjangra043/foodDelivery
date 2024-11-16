import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: {},
  food_list: [],
  totalPrice: 0,
  url: "https://fooddelbackend-njrb.onrender.com/",
  token: localStorage.getItem("token") || "",
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
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setFoodList: (state, action) => {
      const updateFoodList = action.payload.map((item) => ({
        ...item,
        image: `${state.url}/images/${item.image}`,
      }));
      state.food_list = updateFoodList;
    },
  },
});

export const { addToCart, removeFromCart, setToken, setFoodList } =
  cartSlice.actions;

export default cartSlice.reducer;
