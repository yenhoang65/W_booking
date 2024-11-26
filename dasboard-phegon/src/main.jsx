import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index.js";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />

                <Toaster
                    toastOptions={{
                        position: "top-center",
                        style: {
                            background: "#283046",
                            color: "white",
                        },
                    }}
                />
            </Provider>
        </BrowserRouter>
    </StrictMode>
);
