import { createBrowserRouter } from "react-router-dom";
import { PrivateRoute } from "./components/privateRoutes/PrivateRoutes";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Regitser } from "./pages/register/Register";
import { Schedule } from "./pages/schedule/Schedule";
import { Appointments } from "./pages/appointments/Appointments";
import { Services } from "./pages/services/Services";
import { ClientPage } from "./pages/clientPage/ClientPage";
import { BotSetting } from "./pages/botSetting/BotSetting";
import { UserLayout } from "./components/userLayout/UserLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute path="/" element={<UserLayout />} />,
    errorElement: <Login />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "/schedule",
        element: <Schedule />,
      },
      {
        path: "/appointments",
        element: <Appointments />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/bot-setting",
        element: <BotSetting />,
      },
    ],
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
    path: "/appointment/:id",
    element: <ClientPage />,
  },

  {
    path: "*",
    element: <div>404</div>,
  },
]);
