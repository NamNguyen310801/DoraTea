import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./slice/user.slice";
import alertSlice from "./slice/alert.slice";
import categorySlice from "./slice/category.slice";
import productSlice from "./slice/product.slice";
import orderSlice from "./slice/order.slice";
import loadingSlice from "./slice/loading.slice";
import cartSlice from "./slice/cart.slice";
import orderMonthSlice from "./slice/orderMonth.slice";
const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    "alert",
    "loading",
    "order",
    "user",
    "product",
    "orderMonth",
    "category",
  ],
};

const rootReducer = combineReducers({
  user: userSlice,
  alert: alertSlice,
  category: categorySlice,
  product: productSlice,
  order: orderSlice,
  loading: loadingSlice,
  cart: cartSlice,
  orderMonth: orderMonthSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
