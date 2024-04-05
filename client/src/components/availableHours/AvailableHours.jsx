import { useState } from "react";
import styles from "./AvailableHours.module.css";

const AvailableHours = ({ currentDay }) => {
  const [selectedHour, setSelectedHour] = useState("");

  const handleHourClick = (hour, index) => {
    console.log(`Clicked hour: ${hour}`);
    setSelectedHour(index);
  };

  return (
    <div className={styles.clockContainer}>
      <div className={styles.clock}>
        {currentDay.map((hour, index) => {
          return (
            <button
              key={index}
              className={`${styles.hour} ${
                !hour.isAvailable ? styles.inactive : ""
              } ${selectedHour === index ? styles.selectedHour : ""}`}
              onClick={() => handleHourClick(hour.id, index)} //можно отдавать по айди
            >
              {hour.hour}:00
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AvailableHours;
