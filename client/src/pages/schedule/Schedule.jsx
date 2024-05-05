import { useEffect, useState } from "react";
import { Calendar } from "../../components/calendar/Calendar";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Button, useDisclosure } from "@nextui-org/react";
import { ModalScheduleSetTime } from "../../components/modalScheduleSetTime/ModalScheduleSetTime";
import { useGetScheduleQuery } from "../../redux/scheduleApi";
import { Loader } from "../../components/loader/Loader";
import { ModalScheduleHelp } from "../../components/modalScheduleHelp/ModalScheduleHelp";

export const Schedule = () => {
  const [selectedDays, setSelectedDays] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenHelp,
    onOpen: onOpenHelp,
    onOpenChange: onOpenChangeHelp,
  } = useDisclosure();
  const [schedule, setSchedule] = useState([]);
  const {
    refetch,
    isFetching,
    data: scheduleData,
    isLoading,
  } = useGetScheduleQuery();

  useEffect(() => {
    if (scheduleData) {
      setSchedule(scheduleData);
    }
  }, [scheduleData]);

  const chooseAllDays = () => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const daysInMonth = new Date(year, month, 0).getDate();
    const allDaysArray = Array.from(
      { length: daysInMonth },
      (_, i) =>
        `${year}-${String(month).padStart(2, "0")}-${String(i + 1).padStart(
          2,
          "0"
        )}`
    );
    return allDaysArray;
  };

  if (isLoading) return <Loader />;

  return (
    <div className="">
      <div className={`p-3 h-16 flex justify-between items-center`}>
        {selectedDays.length ? (
          <Button
            onClick={() => {
              setSelectedDays([]);
            }}
            variant="light"
            color="primary"
          >
            Отменить
          </Button>
        ) : (
          <div>
            <Button
              onClick={() => setSelectedDays(chooseAllDays())}
              color="secondary"
            >
              Выбрать все
            </Button>
          </div>
        )}
        {selectedDays.length ? (
          <Button onClick={onOpen} color="secondary">
            Править
          </Button>
        ) : (
          <HelpOutlineIcon onClick={onOpenHelp} />
        )}
      </div>
      <Calendar
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
        schedule={schedule}
      />
      <ModalScheduleSetTime
        isFetching={isFetching}
        refetch={refetch}
        setSelectedDays={setSelectedDays}
        selectedDays={selectedDays}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
      <ModalScheduleHelp isOpen={isOpenHelp} onOpenChange={onOpenChangeHelp} />
    </div>
  );
};
