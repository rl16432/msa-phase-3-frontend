import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { loginSlice } from "../components/Login/loginSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      [loginSlice.name]: loginSlice.reducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export default makeStore();
