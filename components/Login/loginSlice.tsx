import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/UserModels";
import { AppState } from "../../store/UserStore";

export interface LoginState {
  userTeam: User | undefined | null;
}

export const initialState: LoginState = {
  userTeam: undefined,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUserTeam: (state, action) => {
      state.userTeam = action.payload;
    },
  },
});

export const { setUserTeam } = loginSlice.actions;

export const selectUserTeam = (state: AppState) => state.login.userTeam;

export default loginSlice.reducer;
