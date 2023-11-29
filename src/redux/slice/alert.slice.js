import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  alert: null,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setSuccessAlert: (state, action) => {
      const successAlert = {
        type: "success",
        message: action.payload,
      };
      state.alert = successAlert;
    },

    setInfoAlert: (state, action) => {
      const infoAlert = {
        type: "info",
        message: action.payload,
      };
      state.alert = infoAlert;
    },
    setWarningAlert: (state, action) => {
      const warningAlert = {
        type: "warning",
        message: action.payload,
      };

      state.alert = warningAlert;
    },
    setErrAlert: (state, action) => {
      const errAlert = {
        type: "error",
        message: action.payload,
      };
      state.alert = errAlert;
    },
    setNullAlert: (state) => {
      state.alert = null;
    },
  },
});

export const {
  setSuccessAlert,
  setNullAlert,
  setInfoAlert,
  setWarningAlert,
  setErrAlert,
} = alertSlice.actions;
export default alertSlice.reducer;
