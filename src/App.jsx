import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./Routes/PrivateRoutes";
import AdminRoute from "./Routes/AdminRoutes";
import RestrictedRoute from "./Routes/RestrictedRoutes";
import {
  adminRoutes,
  privateRoutes,
  publicRoutes,
  restrictedRoutes,
} from "./Routes/AllRoutes";
import NotFound from "./views/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}

        {privateRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<PrivateRoute>{<route.component />}</PrivateRoute>}
          />
        ))}

        {adminRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<AdminRoute>{<route.component />}</AdminRoute>}
          />
        ))}

        {restrictedRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<RestrictedRoute>{<route.component />}</RestrictedRoute>}
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
