export const url = process.env.REACT_APP_API_URL;

// User
export const login = `${url}/user/log-in`;
export const logout = `${url}/user/log-out`;
export const signUp = `${url}/user/sign-up`;
export const getDetailURL = `${url}/user/get-detail`;
export const getAllURL = `${url}/user/getAll`;
export const deleteUserURL = `${url}/user/delete-user`;
export const deleteManyUserURL = `${url}/user/delete-many`;

export const forgetPasswordURL = `${url}/user/forgot-password`;
export const verifyOtpURL = `${url}/user/verify-otp`;
export const resetPasswordURL = `${url}/user/reset-password`;

export const updateUserURL = `${url}/user/update-user`;
export const refreshTokenURL = `${url}/user/refresh-token`;
// Product
export const createProductURL = `${url}/product/create`;
export const getAllProductURL = `${url}/product/getAll`;
export const getAllPopularURL = `${url}/product/getPopular`;
export const getAllDiscountURL = `${url}/product/getDiscount`;
export const getWithCategoryURL = `${url}/product/getWithCategory`;
export const updateProductURL = `${url}/product/update`;
export const deleteProductURL = `${url}/product/delete`;
export const deleteManyProductURL = `${url}/product/delete-many`;
export const getDetailProductURL = `${url}/product/get-details`;
export const createReviewURL = `${url}/product/create-review`;

// Category
export const createCategoryURL = `${url}/category/create`;
export const updateCategoryURL = `${url}/category/update`;
export const deleteCategoryURL = `${url}/category/delete`;
export const getAllCategoryURL = `${url}/category/getAll`;

//Image
export const createImageURL = `${url}/image/create`;
export const deleteImageURL = `${url}/image/delete`;

//Cart
export const addToCartURL = `${url}/cart/addToCart`;
export const getCartListURL = `${url}/cart/getCartList`;
export const getCartItemURL = `${url}/cart/getCartItem`;
export const updateCartItemURL = `${url}/cart/updateCart`;
export const deleteCartItemURL = `${url}/cart/deleteCart`;
export const deleteManyCartItemURL = `${url}/cart/deleteMany`;
export const deleteCartURL = `${url}/cart/deleteAll`;

// Order
export const createOrderURL = `${url}/order/createOrder`;
export const getAllOrderDetailsURL = `${url}/order/getAllOrderDetails`;
export const getAllOrderURL = `${url}/order/getAllOrder`;
export const getRecentOrderURL = `${url}/order/getRecentOrder`;
export const getOrdersByMonthURL = `${url}/order/getOrdersByMonth`;
export const updateOrderURL = `${url}/order/update`;
export const getOrderDetailsURL = `${url}/order/getOrderDetails`;
export const getOrdersMonthCountURL = `${url}/order/monthly-order-count`;
export const cancelOrderURL = `${url}/order/cancelOrder`;
export const successOrderURL = `${url}/order/successOrder`;
export const confirmOrderURL = `${url}/order/confirmOrder`;

// Email
export const sendConfirmOrderURL = `${url}/email/send-confirmOrder`;
export const sendSuccessOrderURL = `${url}/email/send-successOrder`;
