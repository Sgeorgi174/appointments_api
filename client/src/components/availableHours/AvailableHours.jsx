import styles from "./AvailableHours.module.css";

const AvailableHours = ({ selectedDate, handleHourClick, currentDay }) => {
  console.log(currentDay);
  return (
    <div className={styles.clockContainer}>
      <h3 className={styles.clockHeader}>
        Расписание на {selectedDate.toLocaleDateString("ru")}
      </h3>
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
    </div>
  );
};

export default AvailableHours;
