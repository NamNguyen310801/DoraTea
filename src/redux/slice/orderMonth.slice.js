import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  order1: [],
  order2: [],
  order3: [],
  order4: [],
  order5: [],
  order6: [],
  order7: [],
  order8: [],
  order9: [],
  order10: [],
  order11: [],
  order12: [],
};

const orderMonthSlice = createSlice({
  name: "order-month",
  initialState,
  reducers: {
    setOrderMonth1: (state, action) => {
      state.order1 = action.payload;
    },
    setOrderMonth2: (state, action) => {
      state.order2 = action.payload;
    },
    setOrderMonth3: (state, action) => {
      state.order3 = action.payload;
    },
    setOrderMonth4: (state, action) => {
      state.order4 = action.payload;
    },
    setOrderMonth5: (state, action) => {
      state.order5 = action.payload;
    },
    setOrderMonth6: (state, action) => {
      state.order6 = action.payload;
    },
    setOrderMonth7: (state, action) => {
      state.order7 = action.payload;
    },
    setOrderMonth8: (state, action) => {
      state.order8 = action.payload;
    },
    setOrderMonth9: (state, action) => {
      state.order9 = action.payload;
    },
    setOrderMonth10: (state, action) => {
      state.order10 = action.payload;
    },
    setOrderMonth11: (state, action) => {
      state.order11 = action.payload;
    },
    setOrderMonth12: (state, action) => {
      state.order12 = action.payload;
    },
  },
});

export const {
  setOrderMonth1,
  setOrderMonth2,
  setOrderMonth3,
  setOrderMonth4,
  setOrderMonth5,
  setOrderMonth6,
  setOrderMonth7,
  setOrderMonth8,
  setOrderMonth9,
  setOrderMonth10,
  setOrderMonth11,
  setOrderMonth12,
} = orderMonthSlice.actions;
export default orderMonthSlice.reducer;
