import { useState } from "react";
import { Calendar } from "../../components/calendar/Calendar";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Button, useDisclosure } from "@nextui-org/react";
import { ModalScheduleSetTime } from "../../components/modalScheduleSetTime/ModalScheduleSetTime";

export const Schedule = () => {
  const [selectedDays, setSelectedDays] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [schedule, setSchedule] = useState([]);
  return (
    <div className="">
      <div className={`p-3 h-16 flex justify-between items-center`}>
        {selectedDays.length ? (
          <Button
            onClick={() => setSelectedDays([])}
            variant="light"
            color="primary"
          >
            Отменить
          </Button>
        ) : (
          <div></div>
        )}
        {selectedDays.length ? (
          <Button onClick={onOpen} color="secondary">
            Править
          </Button>
        ) : (
          <HelpOutlineIcon />
        )}
      </div>
      <Calendar
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
        schedule={schedule}
      />
      <ModalScheduleSetTime
        setSelectedDays={setSelectedDays}
        setSchedule={setSchedule}
        selectedDays={selectedDays}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
};
