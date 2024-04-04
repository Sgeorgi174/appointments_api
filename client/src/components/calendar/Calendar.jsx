import { useEffect, useState } from "react";
import styles from "./Calendar.module.css";
import AvailableHours from "../availableHours/AvailableHours";

const sliceDate = (date) => {
  const dateString = date;

  const dateObject = new Date(Date.parse(dateString));
  const timezoneOffsetInMinutes = -dateObject.getTimezoneOffset();
  dateObject.setMinutes(dateObject.getMinutes() + timezoneOffsetInMinutes);
  const isoString = dateObject.toISOString().slice(0, 10);

  return isoString;
};

const response = async () => {
  const response = await fetch(`http://localhost:8000/api/timetable/get`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzEyMjE1OTYyLCJleHAiOjE3MTIzODg3NjJ9.DUuukPGAnGP22Bmxw19PYKgJHi8S01wK3Bg0X094TyY`, // добавляем токен в заголовок Authorization
    },
  });

  const data = await response.json();

  return data;
};

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schedule, setSchedule] = useState([]);
  const [currentDay, setCurrentDay] = useState([]);
  const [dateColor, setDateColor] = useState({});

  useEffect(() => {
    response()
      .then((data) => {
        setSchedule(data);
      })
      .catch((error) => {
        console.error("Ошибка:", error); // Обработка ошибок
      });
  }, []);

  useEffect(() => {
    const colorMap = {};
    schedule.forEach((day) => {
      const allUnavailable = day.hours.every((hour) => !hour.isAvailable);
      colorMap[sliceDate(day.date)] = allUnavailable ? "red" : "inherit";
    });
    setDateColor(colorMap);
  }, [schedule]);

  const handleHourClick = (hour) => {
    console.log(`Clicked hour: ${hour}`);
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
    const availableDay = schedule.find(
      (object) => object.date.slice(0, 10) === sliceDate(date)
    );
    setCurrentDay(availableDay ? availableDay.hours : []);
  };

  const renderCalendar = () => {
    const today = new Date();
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
      const isPast = date < today && !isSameDay(date, today);
      const isSelected = date.toDateString() === selectedDate.toDateString();
      const dateString = sliceDate(date);
      const cellStyle = {
        backgroundColor: isPast ? "#ccc" : dateColor[dateString] || "inherit",
      };
      days.push(
        <td
          key={`day-${day}`}
          className={`${styles.dayCell} ${isSelected ? styles.activeDay : ""}`}
          style={cellStyle}
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

  // Функция для проверки, являются ли две даты одним и тем же днем
  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const handlePrevMonth = () => {
    const prevMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() - 1,
      selectedDate.getDate() // Оставляем день таким же, как в текущей дате
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
      <AvailableHours
        currentDay={currentDay}
        selectedDate={selectedDate}
        handleHourClick={handleHourClick}
      />
    </div>
  );
};

export default Calendar;
