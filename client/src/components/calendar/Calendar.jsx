import { useState } from "react";
import styles from "./Calendar.module.css";
import AvailableHours from "../availableHours/AvailableHours";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const renderCalendar = () => {
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
      const isSelected = date.toDateString() === selectedDate.toDateString();
      days.push(
        <td
          key={`day-${day}`}
          className={`${styles.dayCell} ${isSelected ? styles.activeDay : ""}`}
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
      if (i % 7 !== 0) {
        cells.push(cell);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(cell);
      }
      if (i === totalCells.length - 1) {
        rows.push(cells);
      }
    });

    return rows.map((row, i) => <tr key={`row-${i}`}>{row}</tr>);
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  const handlePrevMonth = () => {
    const prevMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() - 1,
      1
    );
    const today = new Date();
    if (prevMonth >= new Date(today.getFullYear(), today.getMonth(), 1)) {
      setSelectedDate(prevMonth);
    }
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      1
    );
    setSelectedDate(nextMonth);
  };

  return (
    <div className={styles.calendarContainer}>
      <table className={styles.calendar}>
        <thead>
          <tr>
            <th colSpan="7" className={styles.header}>
              <button className={styles.switchButton} onClick={handlePrevMonth}>
                {"<"}
              </button>
              {selectedDate.toLocaleString("ru", {
                month: "long",
                year: "numeric",
              })}
              <button className={styles.switchButton} onClick={handleNextMonth}>
                {">"}
              </button>
            </th>
          </tr>
          <tr>
            <th className={styles.weekday}>Вс</th>
            <th className={styles.weekday}>Пн</th>
            <th className={styles.weekday}>Вт</th>
            <th className={styles.weekday}>Ср</th>
            <th className={styles.weekday}>Чт</th>
            <th className={styles.weekday}>Пт</th>
            <th className={styles.weekday}>Сб</th>
          </tr>
        </thead>
        <tbody>{renderCalendar()}</tbody>
      </table>
      <AvailableHours selectedDate={selectedDate} />
    </div>
  );
};

export default Calendar;
