import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: {},
  food_list: [],
  totalPrice: 0,
  url: "http://localhost:4000",
  // url: "https://fooddelbackend-njrb.onrender.com",
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

export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async (itemId, { getState, rejectWithValue }) => {
    const state = getState().cart;
    const { url, token } = state;

    if (!token) {
      console.warn("No token found in state:", state);
      return rejectWithValue("No token available. Please log in.");
    }

    try {
      await axios.post(
        `${url}/api/cart/add`,
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return itemId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add item to cart"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
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
      const updatedFoodList = action.payload.map((item) => ({
        ...item,
        image: `${state.url}/images/${item.image}`,
      }));
      state.food_list = updatedFoodList;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        const itemId = action.payload;
        if (!state.cartItems[itemId]) {
          state.cartItems[itemId] = 1;
        } else {
          state.cartItems[itemId]++;
        }
        state.totalPrice = calculateTotalPrice(
          state.cartItems,
          state.food_list
        );
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        console.error("Failed to add to cart:", action.payload);
      });
  },
});

export const { removeFromCart, setToken, setFoodList } = cartSlice.actions;
export default cartSlice.reducer;
