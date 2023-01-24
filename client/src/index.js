import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  <Auth0Provider
    domain="dev-gu2ural13ockmvha.us.auth0.com"
    clientId="5nARigvDlooDwUXR5FCf0pZ76HltxpG5"
    redirectUri="https://blogmyday.onrender.com/"
    useRefreshTokens
    cacheLocation="localstorage"
  >
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById("root")
);