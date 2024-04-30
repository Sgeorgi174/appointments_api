import { useState } from "react";
import { MonthNavigation } from "./MonthNavigation";
import { DaysOfWeek } from "./DaysOfWeek";
import { MonthDays } from "./MonthDays";

export const Calendar = ({ selectedDays, setSelectedDays, schedule }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  return (
    <div className="flex  flex-col items-center p-3  justify-center">
      <MonthNavigation
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />
      <DaysOfWeek />
      <MonthDays
        schedule={schedule}
        currentMonth={currentMonth}
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
      />
    </div>
  );
};
