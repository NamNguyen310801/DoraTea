import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  productList: null,
  milkTeaList: null,
  popularList: null,
  discountList: null,
  showDetail: false,
  dataDetail: [],
  productRate: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductList: (state, action) => {
      state.productList = action.payload;
    },
    addProductSlice: (state, action) => {
      state.productList.push(action.payload);
    },

    updateProductList: (state, action) => {
      const productEdit = action.payload;
      state.productList?.find((product, index) => {
        if (product._id === productEdit._id) {
          state.productList[index] = productEdit;
          return true;
        }
        return false;
      });
    },
    deletedProductSlice: (state, action) => {
      const delId = action.payload;
      const productDel = state.productList.findIndex(
        (product) => product._id === delId
      );
      state.productList?.splice(productDel, 1);
    },
    setMilkTeaList: (state, action) => {
      state.milkTeaList = action.payload;
    },
    setPopularList: (state, action) => {
      state.popularList = action.payload;
    },
    setDiscountList: (state, action) => {
      state.discountList = action.payload;
    },
    setShowDetail: (state, action) => {
      state.showDetail = action.payload;
    },
    setDataDetail: (state, action) => {
      state.dataDetail = action.payload;
    },
    setProductRate: (state, action) => {
      state.productRate = action.payload;
    },
  },
});

export const {
  setProductList,
  setMilkTeaList,
  setPopularList,
  updateProductList,
  deletedProductSlice,
  addProductSlice,
  setDiscountList,
  setShowDetail,
  setDataDetail,
  setProductRate,
} = productSlice.actions;
export default productSlice.reducer;
