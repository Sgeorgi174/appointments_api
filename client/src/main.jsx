import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Regitser } from "./pages/register/Register";
import { BotSetting } from "./pages/botSetting/BotSetting";
import { PrivateRoute } from "./components/privateRoutes/PrivateRoutes";
import { Schedule } from "./pages/schedule/Schedule";
import { Appointments } from "./pages/appointments/Appointments";
import "./index.css";
import { Services } from "./pages/services/Services";

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
    path: "/appointments",
    element: <PrivateRoute path="/appointments" element={<Appointments />} />,
  },
  {
    path: "/services",
    element: <PrivateRoute path="/services" element={<Services />} />,
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
