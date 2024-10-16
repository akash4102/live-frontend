import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { HotelProvider } from "./Context/HotelContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "./Component/ErrorBoundary.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <ErrorBoundary>
    <AuthProvider>
      <HotelProvider>
        <ToastContainer />
        <App />
      </HotelProvider>
    </AuthProvider>
  </ErrorBoundary>
  </StrictMode>,
);
