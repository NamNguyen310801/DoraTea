import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loadingPopular: false,
  loadingSale: false,
  showOrder: false,
  showRateModal: false,
  textSearch: "",
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
    setShowRateModal: (state, action) => {
      state.showRateModal = action.payload;
    },
    setTextSearch: (state, action) => {
      state.textSearch = action.payload;
    },
  },
});

export const {
  setLoadingSale,
  setLoadingPopular,
  setShowOrder,
  setTextSearch,
  setShowRateModal,
} = loadingSlice.actions;
export default loadingSlice.reducer;
