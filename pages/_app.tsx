import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { setUserTeam } from "../components/Login/loginSlice";
import store, { loadState, saveState } from "../store/UserStore";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    store.dispatch(setUserTeam(loadState()?.userTeam));
    store.subscribe(() => {
      if (typeof window != undefined) {
        saveState(store.getState().login);
      }
    });
  }, []);
  
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </React.StrictMode>
  );
}

export default MyApp;
