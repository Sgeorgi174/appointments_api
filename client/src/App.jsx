import { LoadingProvider } from "./components/loadingContext/LoadingContext";
import { Appointments } from "./pages/appointments/Appointments";
import { BotSetting } from "./pages/botSetting/BotSetting";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Regitser } from "./pages/register/Register";
import { Schedule } from "./pages/schedule/Schedule";
import { ScheduleID } from "./pages/scheduleID/ScheduleID";
import { Services } from "./pages/services/Services";

export const App = ({ children }) => {
  return <>{children}</>;
};

<App>
  <LoadingProvider>
    <Appointments />
    <BotSetting />
    <Home />
    <Login />
    <Regitser />
    <Schedule />
    <ScheduleID />
    <Services />
  </LoadingProvider>
</App>;
