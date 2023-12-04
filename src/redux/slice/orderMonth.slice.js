import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  orderMonthCountList: [],
};

const orderMonthSlice = createSlice({
  name: "order-month",
  initialState,
  reducers: {
    setOrderCountList: (state, action) => {
      state.orderMonthCountList = action.payload;
    },
  },
});

export const { setOrderCountList } = orderMonthSlice.actions;
export default orderMonthSlice.reducer;
