import type { AppProps } from "next/app";
import React from "react";
import { Provider } from "react-redux";
import store from "../store/UserStore";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </React.StrictMode>
  );
}

export default MyApp;
