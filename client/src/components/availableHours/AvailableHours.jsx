import { useState } from "react";
import styles from "./AvailableHours.module.css";

<<<<<<< HEAD
const AvailableHours = ({ selectedDate, handleHourClick, currentDay }) => {
  console.log(currentDay);
=======
const AvailableHours = ({ selectedDate }) => {
  const [selectedHour, setSelectedHour] = useState(null);

  // Обработчик клика на час
  const handleHourClick = (hour) => {
    setSelectedHour(hour);
  };
  const generateHours = () => {
    const hours = [];
    for (let hour = 9; hour <= 18; hour++) {
      const isSelected = selectedHour === hour;
      hours.push(
        <div
          key={`hour-${hour}`}
          className={`${styles.hour} ${isSelected ? styles.selectedHour : ""}`}
          onClick={() => handleHourClick(hour)}
        >
          {hour}:00
        </div>
      );
    }
    return hours;
  };

>>>>>>> cdf2c10558295bb33f88a23a4d7e3cf131e5e0ef
  return (
    <div className={styles.clockContainer}>
      <h3 className={styles.clockHeader}>
        Расписание на {selectedDate.toLocaleDateString("ru")}
      </h3>
<<<<<<< HEAD
      <div className={styles.clock}>
        {currentDay.map((hour) => {
          return (
            <div
              key={currentDay.id}
              className={`${styles.hour} ${
                !hour.isAvailable ? styles.inactive : ""
              }`}
              onClick={() => handleHourClick(hour)}
            >
              {hour.hour}:00
            </div>
          );
        })}
      </div>
=======
      <div className={styles.clock}>{generateHours()}</div>
>>>>>>> cdf2c10558295bb33f88a23a4d7e3cf131e5e0ef
    </div>
  );
};

export default AvailableHours;
