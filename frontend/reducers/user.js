import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  username: null,
  firstname: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, user } = action.payload || {};
      state.token = token || null;
      state.username = user?.username || null;
      state.firstname = user?.firstname || null;
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
      state.firstname = null;
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;
