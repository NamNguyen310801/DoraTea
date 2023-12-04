import { Route, Routes } from "react-router-dom";
import {
  About,
  Admin,
  Checkout,
  ForgetPassword,
  Home,
  Login,
  Menu,
  News,
  ProductDetail,
  SignUp,
  User,
} from "./pages";
import { Alert, NotFound } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { isJsonString } from "./utils/function";
import jwt_decode from "jwt-decode";
import { setUser } from "./redux/slice/user.slice";
import {
  setAllCategory,
  setCategoryList,
  setHeadCategoryList,
} from "./redux/slice/category.slice";
import * as UserService from "../src/service/user.api";
import * as CategoryService from "./service/category.api";
import * as ProductService from "./service/product.api";
import * as CartService from "./service/cart.api";
import {
  setDiscountList,
  setMilkTeaList,
  setPopularList,
  setProductList,
} from "./redux/slice/product.slice";
import LoadingMain from "./components/LoadingMain";
import { setLoadingPopular, setLoadingSale } from "./redux/slice/loading.slice";
import {
  setCartList,
  setTotalAmount,
  setTotalPrice,
} from "./redux/slice/cart.slice";
import Order from "./pages/Order/Order";
import { getAllOrderDetailsAPI } from "./service/order.api";
import { setOrderList } from "./redux/slice/order.slice";

function App() {
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.cart.cartList);
  const alert = useSelector((state) => state.alert.alert);
  const user = useSelector((state) => state.user.user);
  const popularList = useSelector((state) => state.product.popularList);
  const discountList = useSelector((state) => state.product.discountList);
  const [isLoading, setIsLoading] = useState(false);

  //
  useEffect(() => {
    const { decoded, storageData } = handleDecoded();
    if (user?.email) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 5000);
    }
    if (decoded?.id && !user?.email) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
  }, []);
  useEffect(() => {
    handleGetCategory();
    getDataList();
    // handleGetAllProduct();
  }, []);

  useEffect(() => {
    (async () => {
      if (!discountList) {
        dispatch(setLoadingSale(true));
        const disPro = await ProductService.getDiscountProduct();
        if (disPro.status === "OK") {
          dispatch(setDiscountList(disPro.data));
        }
      }
      dispatch(setLoadingSale(false));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!popularList) {
        dispatch(setLoadingPopular(true));
        const popPro = await ProductService.getPopularProduct();
        if (popPro.status === "OK") {
          dispatch(setPopularList(popPro.data));
        }
      }
      dispatch(setLoadingPopular(false));
    })();
  }, []);
  useEffect(() => {
    if (user?.id) {
      getCartList();
      getOrderList();
    }
  }, [user]);

  useEffect(() => {
    if (cartList?.length > 0) {
      const amount = cartList.reduce((totalAmount, item) => {
        return totalAmount + item?.quantity;
      }, 0);
      const total = cartList.reduce((total, item) => {
        return (
          total +
          Math.round(
            (item?.product?.price -
              item?.product?.price * item?.product?.discount * 0.01) /
              1000
          ) *
            1000 *
            item?.quantity
        );
      }, 0);
      dispatch(setTotalPrice(total));
      dispatch(setTotalAmount(amount));
    }
  }, [cartList, user]);

  const getDataList = async () => {
    const milkTea = await ProductService.getWithCategory("Trà sữa");
    if (milkTea.status === "OK") {
      dispatch(setMilkTeaList(milkTea.data));
    }
  };
  const getCartList = async () => {
    const cartL = await CartService.getCartListAPI(user?.id);
    if (cartL.status === "OK") {
      dispatch(setCartList(cartL.data));
    }
  };
  //lay access_token trong localStorage va chuyen sang JSON
  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      //chuyen tu dang token sang json
      decoded = jwt_decode(storageData);
    }
    return { decoded, storageData };
  };

  const getOrderList = async () => {
    const res = await getAllOrderDetailsAPI(user?.id);
    if (res.status === "OK") {
      dispatch(setOrderList(res.data));
    }
  };
  // Cac ham goi de lay du lieu
  const handleGetCategory = async () => {
    const cate = await CategoryService.getAllCategory();
    if (cate.status === "OK") {
      dispatch(setAllCategory(cate.data));
      const category = [...new Set(cate.data.map((ct) => ct.category))];
      const headCategory = [...new Set(cate.data.map((ct) => ct.headCategory))];
      dispatch(setCategoryList(category));
      dispatch(setHeadCategoryList(headCategory));
    } else {
      console.log(cate.message);
    }
  };
  const handleGetAllProduct = async () => {
    const res = await ProductService.getAllProduct();
    if (res.status === "OK") {
      dispatch(setProductList(res.data));
    } else {
      console.log(res.message);
    }
  };
  const handleGetDetailsUser = async (id, token) => {
    setIsLoading(true);
    const res = await UserService.getDetailUser(id, token);
    dispatch(setUser({ ...res?.data, access_token: token }));
    setIsLoading(false);
  };

  //kiem tra refreshToken het han chua
  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      const currentTime = new Date();
      const { decoded } = handleDecoded();
      if (decoded?.exp < currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken();
        config.headers["token"] = `Bearer ${data?.access_token}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  return (
    <div className="relative bg-cardOverlay w-full">
      {isLoading && (
        <div className="md:fixed z-[1001] absolute md:inset-0 flex items-center justify-center w-full h-full">
          <LoadingMain />
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route
          path="/admin/*"
          element={user && user?.isAdmin ? <Admin /> : <NotFound />}
        />

        <Route path="/user/*" element={user ? <User /> : <NotFound />} />
        <Route path="/menu/*" element={<Menu />} />
        <Route path="/about/*" element={<About />} />
        <Route path="/createOrder" element={<Order />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/news/*" element={<News />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {alert && <Alert type={alert.type} message={alert.message} />}
    </div>
  );
}

export default App;
