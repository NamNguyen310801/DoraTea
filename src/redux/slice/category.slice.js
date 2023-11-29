import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  categoryList: null,
  headCategoryList: null,
  allCategory: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoryList: (state, action) => {
      state.categoryList = action.payload;
    },
    setHeadCategoryList: (state, action) => {
      state.headCategoryList = action.payload;
    },
    setAllCategory: (state, action) => {
      state.allCategory = action.payload;
    },
  },
});

export const { setCategoryList, setHeadCategoryList, setAllCategory } =
  categorySlice.actions;
export default categorySlice.reducer;
