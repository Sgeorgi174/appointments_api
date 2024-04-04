import styles from "./AvailableHours.module.css";

const AvailableHours = ({ handleHourClick, currentDay }) => {
  console.log(currentDay);
  return (
    <div className={styles.clockContainer}>
      <div className={styles.clock}>
        {currentDay.map((hour, index) => {
          return (
            <div
              key={index}
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
    </div>
  );
};

export default AvailableHours;
