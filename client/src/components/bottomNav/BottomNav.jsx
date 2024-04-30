import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";
import { Tab, Tabs } from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";

export const MobileNavigation = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex justify-center w-full fixed bottom-0 right-0 left-0 pt-2 pb-2">
      <Tabs
        selectedKey={pathname}
        aria-label="Options"
        color="secondary"
        className="w-full h-full"
        classNames={{
          tabList: "bg-black h-[60px] w-full",
          cursor: "h-full",
          tab: "h-full",
        }}
      >
        <Tab
          id="/"
          key="/"
          title={
            <Link to="/" className="flex items-center flex-col space-x-2">
              <CalendarMonthIcon sx={{ width: 30, height: 30 }} />
              <span>Записи</span>
            </Link>
          }
        />
        <Tab
          id="/schedule"
          key="/schedule"
          title={
            <Link
              to="/schedule"
              className="flex items-center flex-col space-x-2"
            >
              <EditCalendarIcon sx={{ width: 30, height: 30 }} />
              <span>График</span>
            </Link>
          }
        />
        <Tab
          id="/settings"
          key="/settings"
          title={
            <Link
              to="/settings"
              className="flex items-center flex-col space-x-2"
            >
              <SettingsIcon sx={{ width: 30, height: 30 }} />
              <span>Настройки</span>
            </Link>
          }
        />
      </Tabs>
    </div>
  );
};
