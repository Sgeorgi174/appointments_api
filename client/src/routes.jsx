import { createBrowserRouter } from "react-router-dom";
import { PrivateRoute } from "./components/privateRoutes/PrivateRoutes";
import { Schedule } from "./pages/schedule/Schedule";
import { Appointments } from "./pages/appointments/Appointments";
import { ClientPage } from "./pages/clientPage/ClientPage";
import { UserLayout } from "./components/userLayout/UserLayout";
import { Auth } from "./pages/login/Auth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />, // element: <PrivateRoute path="/" element={<UserLayout />} />, //element: <UserLayout />,
    errorElement: <Auth />,
    children: [
      { path: "", element: <Appointments /> },
      {
        path: "/schedule",
        element: <Schedule />,
      },
      {
        path: "/settings",
        element: <div>Settings</div>,
      },
    ],
  },
  {
    path: "/login",
    element: <Auth />,
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
