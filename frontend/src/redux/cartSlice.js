import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: {},
  food_list: [],
  totalPrice: 0,
  // url: "http://localhost:4000",
  url: "https://fooddelbackend-njrb.onrender.com",
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
      state.cartItems[itemId] = (state.cartItems[itemId] || 0) + 1;
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
      state.food_list = action.payload.map((item) => ({
        ...item,
        image: `${state.url}/images/${item.image}`,
      }));
    },
    clearCart: (state) => {
      state.cartItems = {};
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, setToken, setFoodList, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
