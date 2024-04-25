import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export const SettingsTabs = ({ value, handleChange }) => {
  return (
    <Box sx={{ width: "100%", mb: "15px" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        centered
      >
        <Tab
          wrapped
          value={0}
          sx={{
            color: "#fff",
            fontSize: 10,
            fontWeight: 600,
            p: "10px 13px",
            minWidth: "30px",
          }}
          label="Token"
        />
        <Tab
          wrapped
          value={1}
          sx={{
            color: "#fff",
            fontSize: 10,
            fontWeight: 600,
            p: "10px 13px",
            minWidth: "30px",
          }}
          label="Контакты"
        />
        <Tab
          wrapped
          value={2}
          sx={{
            color: "#fff",
            fontSize: 10,
            fontWeight: 600,
            p: "10px 13px",
            minWidth: "30px",
          }}
          label="Приветствие"
        />
        <Tab
          wrapped
          value={3}
          sx={{
            color: "#fff",
            fontSize: 10,
            fontWeight: 600,
            p: "10px 13px",
            minWidth: "30px",
          }}
          label="Уведомления"
        />
      </Tabs>
    </Box>
  );
};
