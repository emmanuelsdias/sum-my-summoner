import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Helmet, HelmetProvider } from "react-helmet-async";

import App from "./App";
import store from "./store";

import "./styles/general.css";

const SecurityLayer = ({ children }) => {
  return (
    <>
      <Helmet>
        <meta
          http-equiv="Content-Security-Policy"
          content="
            default-src 'self' https: data: *.googleapis.com localhost:3001;
            base-uri 'self';
            font-src 'self';
            form-action 'self';
            img-src 'self' data: https://cdn.communitydragon.org;
            object-src 'none';
            script-src 'self' data: https://apis.google.com;
            script-src-attr 'none';
            style-src 'self' https: 'unsafe-inline';
            upgrade-insecure-requests"
        />
      </Helmet>
      {children}
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <HelmetProvider context={{}}>
      <SecurityLayer>
        <Provider store={store}>
          <App />
        </Provider>
      </SecurityLayer>
    </HelmetProvider>
  </React.StrictMode>
);
