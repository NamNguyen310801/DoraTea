import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  userList: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const {
        _id = "",
        name,
        email,
        access_token,
        role = 3,
        phone = "",
        address = "",
        avatar = "",
        refresh_token = "",
      } = action.payload;
      state.user = {
        id: _id,
        name: name || email,
        email: email,
        phone: phone,
        address: address,
        avatar: avatar,
        role: role,
        access_token: access_token,
        refresh_token: refresh_token,
      };
    },
    updateUser: (state, action) => {
      state.user = {
        ...state.user,
        name: action.payload.name,
        phone: action.payload.phone,
        address: action.payload.address,
        avatar: action.payload.avatar,
      };
    },
    resetUser: (state) => {
      state.user = null;
    },
    setUserList: (state, action) => {
      state.userList = action.payload;
    },
    updateUserList: (state, action) => {
      const userEdit = action.payload;
      state.userList?.find((user, index) => {
        if (user._id === userEdit._id) {
          state.userList[index] = userEdit;
          return true;
        }
        return false;
      });
    },
    deletedUserSlice: (state, action) => {
      const delId = action.payload;
      const userDel = state.userList.findIndex((user) => user._id === delId);
      state.userList?.splice(userDel, 1);
    },
  },
});

export const {
  setUser,
  updateUser,
  resetUser,
  setUserList,
  updateUserList,
  deletedUserSlice,
} = userSlice.actions;
export default userSlice.reducer;
