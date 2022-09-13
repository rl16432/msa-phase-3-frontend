import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { loginSlice, LoginState } from "../components/Login/loginSlice";

export const loadState = (): LoginState | undefined => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState == null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch {
    // ignore write errors
  }
};

export const makeStore = () =>
  configureStore({
    reducer: {
      [loginSlice.name]: loginSlice.reducer,
    },
  });

const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export default store;
