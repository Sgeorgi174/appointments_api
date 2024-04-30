import { Button } from "@nextui-org/react";
import { format, startOfMonth, isBefore, add, sub } from "date-fns";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ru } from "date-fns/locale";

export const MonthNavigation = ({ currentMonth, setCurrentMonth }) => {
  const monthYear = format(currentMonth, "LLLL yyyy", { locale: ru });
  const capitalizedMonthYear =
    monthYear.charAt(0).toUpperCase() + monthYear.slice(1);

  return (
    <div className="flex justify-between items-center w-full">
      <Button
        className=" bg-transparent"
        disabled={isBefore(
          add(currentMonth, { months: -1 }),
          startOfMonth(new Date())
        )}
        onClick={() => setCurrentMonth(sub(currentMonth, { months: 1 }))}
      >
        <ArrowBackIosNewIcon sx={{ color: "#fff" }} />
      </Button>
      <h2>{capitalizedMonthYear}</h2>
      <Button
        className=" bg-transparent"
        onClick={() => setCurrentMonth(add(currentMonth, { months: 1 }))}
      >
        <ArrowForwardIosIcon sx={{ color: "#fff" }} />
      </Button>
    </div>
  );
};
