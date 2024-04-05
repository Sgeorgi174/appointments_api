export const renderCalendar = ({
  selectedDate,
  styles,
  sliceDate,
  handleDayClick,
  dateClass,
}) => {
  const todayWithoutTime = new Date();
  todayWithoutTime.setHours(0, 0, 0, 0);

  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  ).getDay();

  const blanks = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    blanks.push(<td key={`blank-${i}`} className={styles.emptyCell}></td>);
  }

  const days = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      day
    );
    const dateString = sliceDate(date);
    const isSelected = date.toDateString() === selectedDate.toDateString();
    const dateWithoutTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const isPast = dateWithoutTime < todayWithoutTime; // Проверяем, является ли день прошедшим
    const cellClassName = `${styles.dayCell} ${
      isSelected ? styles.activeDay : ""
    } ${dateClass[dateString] || ""} ${isPast ? styles.unavailableDate : ""}`; // Добавляем класс для прошедших дней
    days.push(
      <td
        key={`day-${day}`}
        className={cellClassName}
        onClick={() => handleDayClick(date)}
      >
        {day}
      </td>
    );
  }

  const totalCells = [...blanks, ...days];
  const rows = [];
  let cells = [];

  totalCells.forEach((cell, i) => {
    if (i % 7 !== 0 || i === 0) {
      cells.push(cell);
    } else {
      rows.push(<tr key={`row-${rows.length}`}>{cells}</tr>);
      cells = [];
      cells.push(cell);
    }
    if (i === totalCells.length - 1) {
      rows.push(<tr key={`row-${rows.length}`}>{cells}</tr>);
    }
  });

  return rows;
};
