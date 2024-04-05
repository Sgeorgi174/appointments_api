import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Regitser } from "./pages/register/Register";
import { BotSetting } from "./pages/botSetting/BotSetting";
import { PrivateRoute } from "./components/privateRoutes/PrivateRoutes";
import "./index.css";
import { Schedule } from "./pages/schedule/Schedule";

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
    path: "/schedule",
    element: <PrivateRoute path="/schedule" element={<Schedule />} />,
  },
  {
    path: "/bot-setting",
    element: <PrivateRoute path="/bot-setting" element={<BotSetting />} />,
  },
  {
    path: "*",
    element: <div>404</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
