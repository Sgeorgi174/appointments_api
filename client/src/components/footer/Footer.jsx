import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  return (
    <footer>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          borderRadius: 0,
          background: "transparent",
        }}
        elevation={5}
      >
        <BottomNavigation
          sx={{ background: "rgba(0, 0, 0, 0.95)", height: 81 }}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            onClick={() => {
              navigate("/");
            }}
            icon={
              <HomeIcon
                sx={{ width: 40, height: 40, color: "#fff", padding: 0 }}
              />
            }
          />
          <BottomNavigationAction
            onClick={() => {
              navigate("/bot-setting");
            }}
            icon={
              <SmartToyIcon
                sx={{ width: 40, height: 40, color: "#fff", padding: 0 }}
              />
            }
          />
          <BottomNavigationAction
            onClick={() => {
              navigate("/appointments");
            }}
            icon={
              <CalendarMonthIcon
                sx={{ width: 40, height: 40, color: "#fff", padding: 0 }}
              />
            }
          />

          <BottomNavigationAction
            onClick={() => {
              navigate("/schedule");
            }}
            icon={
              <EditCalendarIcon
                sx={{ width: 40, height: 40, color: "#fff", padding: 0 }}
              />
            }
          />
          <BottomNavigationAction
            onClick={() => {
              navigate("/services");
            }}
            icon={
              <FactCheckIcon
                sx={{ width: 40, height: 40, color: "#fff", padding: 0 }}
              />
            }
          />
        </BottomNavigation>
      </Paper>
    </footer>
  );
};
