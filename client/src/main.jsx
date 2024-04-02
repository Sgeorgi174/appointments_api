import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home/Home";
import "./index.css";
import { Login } from "./pages/login/Login";
import { Regitser } from "./pages/register/Register";
import { PrivateRoute } from "./components/privateRoutes/PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute path="/" element={<Home />} />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Regitser />,
  },
  {
    path: "/calendar",
    element: <div>Calendar</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
