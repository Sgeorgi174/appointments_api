const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export const DaysOfWeek = () => (
  <div className="grid grid-cols-7 w-full gap-2 text-center mt-4">
    {daysOfWeek.map((day, index) => (
      <div key={index} className="font-bold">
        {day}
      </div>
    ))}
  </div>
);
