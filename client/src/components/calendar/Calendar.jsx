import { useEffect, useState } from "react";
import AvailableHours from "../availableHours/AvailableHours";
import { sliceDate } from "../../utils/slicers";
import { CalendarHeader } from "./CalendarHeader";
import styles from "./Calendar.module.css";

const Calendar = ({ data }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [currentDay, setCurrentDay] = useState([]);
  const [dateClass, setDateClass] = useState({});

  useEffect(() => {
    const classMap = {};
    data.forEach((day) => {
      const allUnavailable = day.hours.every((hour) => !hour.isAvailable);
      classMap[sliceDate(day.date)] = allUnavailable
        ? styles.unavailableDate
        : styles.availableDate;
    });
    setDateClass(classMap);
  }, [data]);

  const handleDayClick = (date) => {
    setSelectedDate(date);
    const dateString = sliceDate(date);
    const availableDay = data.find(
      (object) => sliceDate(object.date) === dateString
    );
    setCurrentDay(availableDay ? availableDay.hours : []);
  };

  const renderCalendar = () => {
    const blanks = [];
    const firstDayOfMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    ).getDay();
    const startingPoint = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Изменяем индекс начала недели с воскресенья на понедельник

    for (let i = 0; i < startingPoint; i++) {
      blanks.push(<div key={`blank-${i}`} className={styles.emptyCell}></div>);
    }

    const todayWithoutTime = new Date();
    todayWithoutTime.setHours(0, 0, 0, 0);

    const daysInMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    ).getDate();

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
      const isPast = dateWithoutTime < todayWithoutTime;
      const cellClassName = `${styles.dayCell} ${
        isSelected ? styles.activeDay : ""
      } ${dateClass[dateString] || ""} ${isPast ? styles.unavailableDate : ""}`;
      days.push(
        <div
          key={`day-${day}`}
          className={cellClassName}
          onClick={() => handleDayClick(date)}
        >
          {day}
        </div>
      );
    }

    const totalCells = [...blanks, ...days];

    return totalCells;
  };

  return (
    <>
      <div className={styles.calendarContainer}>
        <CalendarHeader
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
        />
        <div className={styles.calendarGrid}>
          <div className={styles.weekday}>Пн</div>
          <div className={styles.weekday}>Вт</div>
          <div className={styles.weekday}>Ср</div>
          <div className={styles.weekday}>Чт</div>
          <div className={styles.weekday}>Пт</div>
          <div className={styles.weekday}>Сб</div>
          <div className={styles.weekday}>Вс</div>
          {renderCalendar()}
        </div>
      </div>
      <AvailableHours currentDay={currentDay} />
    </>
  );
};

export default Calendar;
