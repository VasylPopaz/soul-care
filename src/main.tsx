import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import "modern-normalize/modern-normalize.css";
import "react-toastify/dist/ReactToastify.css";

import { App } from "./components";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
    <ToastContainer autoClose={2500} transition={Zoom} theme="colored" />
  </BrowserRouter>
);
