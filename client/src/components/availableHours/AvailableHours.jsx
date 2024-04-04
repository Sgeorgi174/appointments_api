import { useState } from "react";
import styles from "./AvailableHours.module.css";

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

  return (
    <div className={styles.clockContainer}>
      <h3 className={styles.clockHeader}>
        Расписание на {selectedDate.toLocaleDateString("ru")}
      </h3>
      <div className={styles.clock}>{generateHours()}</div>
    </div>
  );
};

export default AvailableHours;
