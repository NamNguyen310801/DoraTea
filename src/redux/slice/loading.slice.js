import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loadingPopular: false,
  loadingSale: false,
  showOrder: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoadingSale: (state, action) => {
      state.loadingSale = action.payload;
    },
    setLoadingPopular: (state, action) => {
      state.loadingPopular = action.payload;
    },
    setShowOrder: (state, action) => {
      state.showOrder = action.payload;
    },
  },
});

export const { setLoadingSale, setLoadingPopular, setShowOrder } =
  loadingSlice.actions;
export default loadingSlice.reducer;
