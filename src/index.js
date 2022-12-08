import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import Web3Provider from "./contexts/web3Provider.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Web3Provider>
      <App />
    </Web3Provider>
  </React.StrictMode>
);
