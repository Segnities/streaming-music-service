import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

interface InitialStateInterface {
  user: User | {};
  isAuth: boolean;
}

const initialState: InitialStateInterface = {
  user: {},
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
  },
});
export const { setIsAuth, setUser } = authSlice.actions;

export default authSlice;
