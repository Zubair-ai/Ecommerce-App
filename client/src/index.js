import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./usecontext/AuthContextProvider";
import SearchContextProvider from "./usecontext/SearchContextProvider";
import 'antd/dist/reset.css';
import { CartProvider } from "./usecontext/CartContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <SearchContextProvider>
    <CartProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </CartProvider>
    </SearchContextProvider>
  </AuthContextProvider>
);
