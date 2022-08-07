import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { userData } = action.payload;

      if (userData === null) {
        state.isAuth = false;
        state.user = null;
      } else {
        state.isAuth = true;
        state.user = userData;
      }
    },
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
