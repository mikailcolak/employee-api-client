import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import configureStore, { appInitialState } from "./store";
import { webFontsAreLoaded, windowLoaded, systemDetected } from "./store/runtime/actions";
import { updateLocation } from "./store/runtime/actions";
import detect from 'browser-detect';


import "./index.css";

async function appEntryPoint() {

  const store = configureStore(appInitialState);

  const renderer = window && window.document
    ? ReactDOM.render
    : ReactDOM.hydrate;

  if (window && window?.document?.fonts?.status !== "loaded") {
    window.document.fonts.onloadingdone = (e: any) => {
      store.dispatch(webFontsAreLoaded(true));
    };
  } else {
    store.dispatch(webFontsAreLoaded(true));
  }

  if (window && window.document.readyState !== "complete") {
    window.addEventListener("load", () => {
      store.dispatch(windowLoaded(true));
    });
  } else {
    store.dispatch(windowLoaded(true));
  }

  if (window && window.location) {
    var original = window.history.pushState.bind(window.history);
    const hookedPushState = (
      data: any,
      title: string,
      url?: string | null | undefined
    ) => {
      original(data, title, url);
      store.dispatch(updateLocation(url ?? window.location.pathname));
    };
    window.history.pushState = hookedPushState.bind(window.history);
    window.addEventListener("popstate", () => {
      store.dispatch(updateLocation(window.location.pathname));
    });
  }

  store.dispatch(systemDetected(detect()));

  renderer(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
}

appEntryPoint().then(() => {
  if (process.env.NODE_ENV === "development") {
    console.info("app successfully mounted.");
  }
}).catch((err) => {
  console.error(
    `An unexpected error occured while mounting the app: ${err}`
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
