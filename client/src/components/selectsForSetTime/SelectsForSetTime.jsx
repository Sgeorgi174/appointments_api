import { Select, SelectItem } from "@nextui-org/react";
import { timesForSelect } from "../../utils/timesForSelect";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export const SelectsForSetTime = ({
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  disabled,
}) => {
  return (
    <div className="flex w-full justify-center gap-3 items-center">
      <Select
        startContent={
          <AccessTimeIcon sx={{ color: "#fff", width: 20, height: 20 }} />
        }
        isDisabled={disabled}
        label="Начало"
        isRequired
        name="start"
        selectedKeys={startTime}
        onSelectionChange={setStartTime}
        className="w-[150px]"
        classNames={{
          trigger: "bg-[#bbb]",
          label: "text-black group-data-[filled=true]:text-black",
          listboxWrapper: "bg-[#bbb]",
          popoverContent: "bg-[#bbb]",
          value: "text-black",
        }}
      >
        {timesForSelect().map((time) => (
          <SelectItem className="text-black font-bold" key={time} value={time}>
            {time}
          </SelectItem>
        ))}
      </Select>
      <div className="w-[30px] h-[2px] bg-white"></div>
      <Select
        startContent={
          <AccessTimeIcon sx={{ color: "#fff", width: 20, height: 20 }} />
        }
        isDisabled={disabled}
        label="Конец"
        isRequired
        className="w-[150px]"
        name="end"
        selectedKeys={endTime}
        onSelectionChange={setEndTime}
        classNames={{
          trigger: "bg-[#bbb]",
          label: "text-black group-data-[filled=true]:text-black",
          listboxWrapper: "bg-[#bbb]",
          popoverContent: "bg-[#bbb]",
          value: "text-black",
        }}
      >
        {timesForSelect().map((time) => (
          <SelectItem className="text-black font-bold" key={time} value={time}>
            {time}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};
