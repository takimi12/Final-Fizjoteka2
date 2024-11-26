import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  _id: string;
  title: string;
  price: number;
  imageFileUrl: string;
  quantity: number;
}

const cartSlice = createSlice({
  name: "cart",
  initialState: [] as CartItem[],
  reducers: {
    addToCart(state, action: PayloadAction<Omit<CartItem, 'quantity'>>) {
      const { _id, title, price, imageFileUrl } = action.payload;
      const existingItem = state.find((item) => item._id === _id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ _id, title, price, imageFileUrl, quantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<{ _id: string }>) {
      const { _id } = action.payload;
      const existingItem = state.find((item) => item._id === _id);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          return state.filter((item) => item._id !== _id);
        } else {
          existingItem.quantity -= 1;
        }
      }
    },
    removeAllFromCart(state, action: PayloadAction<{ _id: string }>) {
      const { _id } = action.payload;
      return state.filter((item) => item._id !== _id);
    },
  },
});

export const selectTotalPrice = (state: { cart: CartItem[] }) =>
  state.cart.reduce((total, item) => total + item.price * item.quantity, 0);

export const { addToCart, removeFromCart, removeAllFromCart } = cartSlice.actions;
export default cartSlice.reducer;