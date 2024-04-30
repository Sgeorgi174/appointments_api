import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  startOfWeek,
  endOfWeek,
} from "date-fns";

export const MonthDays = ({
  currentMonth,
  selectedDays,
  setSelectedDays,
  schedule,
}) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const firstDayOfMonth = startOfWeek(monthStart, { weekStartsOn: 1 });
  const lastDayOfMonth = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const monthDays = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const handleDayClick = (day) => {
    const dayString = format(day, "yyyy-MM-dd");
    if (selectedDays.includes(dayString)) {
      setSelectedDays(selectedDays.filter((d) => d !== dayString));
    } else {
      setSelectedDays([...selectedDays, dayString]);
    }
  };

  return (
    <div className="grid grid-cols-7 gap-2 text-center mt-4">
      {monthDays.map((day) => {
        const dayString = format(day, "yyyy-MM-dd");
        const daySchedule = schedule.find((item) => item.date === dayString);

        return (
          <div
            key={day.toString()}
            className={`h-[45px] pl-1 pr-1 w-[45px] rounded ${
              isSameMonth(day, currentMonth) ? "bg-[#323237]" : "bg-transparent"
            } ${selectedDays.includes(dayString) ? "bg-[#7828c8]" : ""}`}
            onClick={() =>
              isSameMonth(day, currentMonth) && handleDayClick(day)
            }
          >
            {isSameMonth(day, currentMonth) && (
              <div>
                <div className="text-left text-xs">{format(day, "d")}</div>
                {daySchedule && (
                  <div>
                    <p className="text-right text-warning-300 text-[8px]">
                      {daySchedule.startTime}
                    </p>
                    <p className="text-right text-warning-300 text-[8px]">
                      {daySchedule.endTime}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
