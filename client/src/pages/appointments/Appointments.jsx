import RefreshIcon from "@mui/icons-material/Refresh";
import { Calendar, Tab, Tabs } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import { useState } from "react";

export const Appointments = () => {
  const [selected, setSelected] = useState("day");
  const [value, setValue] = useState(today(getLocalTimeZone()));

  return (
    <div>
      <div className="p-3 h-16 flex justify-end items-center">
        <RefreshIcon />
      </div>
      <div className="flex w-full items-center flex-col">
        <Tabs
          color="secondary"
          aria-label="Options"
          selectedKey={selected}
          onSelectionChange={setSelected}
        >
          <Tab key="day" title="День"></Tab>
          <Tab key="list" title="Список"></Tab>
          <Tab key="pending" title="В ожидании"></Tab>
        </Tabs>
      </div>
      <div className="flex mt-4 justify-center w-full">
        <I18nProvider className="w-full" locale="ru-Ru-chinese">
          <Calendar
            color="secondary"
            aria-label="Date (Controlled)"
            value={value}
            onChange={setValue}
            className="bg-[#898989]"
            classNames={{
              headerWrapper: "bg-[#3b3b3b]",
              gridHeaderRow: "bg-[#3b3b3b]",
              title: "text-white",
              nextButton: "text-white",
              prevButton: "text-white",
              cellButton: "text-white data-[disabled=true]:text-[#737373]",
            }}
          />
        </I18nProvider>
      </div>

      {/* <Button
        onClick={() => {
          console.log(
            `${value.year}-${
              String(value.month).length === 1 ? `0${value.month}` : value.month
            }-${String(value.day).length === 1 ? `0${value.day}` : value.day}`
          );
        }}
      >
        Тык
      </Button> */}
    </div>
  );
};
