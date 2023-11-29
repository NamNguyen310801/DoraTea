import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isShowCart: false,
  cartList: [] || null,
  totalPrice: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartShow: (state, action) => {
      state.isShowCart = action.payload;
    },
    setCartList: (state, action) => {
      state.cartList = action.payload;
    },
    addToCartList: (state, action) => {
      const data = action.payload;
      const existData = state.cartList?.find((item) => item?._id === data?._id);
      if (existData) {
        state.cartList?.find((item, index) => {
          if (item?._id === existData?._id) {
            state.cartList[index] = {
              ...existData,
              quantity: existData.quantity + 1,
            };
            return true;
          }
          return false;
        });
      } else {
        state.cartList?.push(data);
      }
    },
    deleteCartItem: (state, action) => {
      const itemDelete = action.payload;
      const cartItem = state.cartList.findIndex(
        (item) => item._id === itemDelete
      );
      if (cartItem !== -1) {
        state.cartList.splice(cartItem, 1);
      }
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
    increaseAmount: (state, action) => {
      const cartItem = action.payload;
      state.cartList?.find((cart, index) => {
        if (cart._id === cartItem._id) {
          state.cartList[index].quantity = cartItem?.quantity + 1;
          return true;
        }
        return false;
      });
    },
    decreaseAmount: (state, action) => {
      const itemCart = state.cartList?.find(
        (item) => item._id === action.payload._id
      );
      if (itemCart && itemCart?.quantity > 1) {
        state.cartList.find((item, index) => {
          if (item._id === itemCart._id) {
            state.cartList[index].quantity = itemCart.quantity - 1;
            return true;
          }
          return false;
        });
      } else {
        const cartItem = state.cartList.findIndex(
          (item) => item._id === itemCart._id
        );
        if (cartItem !== -1) {
          state.cartList.splice(cartItem, 1);
        }
      }
    },
  },
});

export const {
  setCartShow,
  setCartList,
  addToCartList,
  setTotalPrice,
  setTotalAmount,
  increaseAmount,
  decreaseAmount,
  deleteCartItem,
} = cartSlice.actions;
export default cartSlice.reducer;
