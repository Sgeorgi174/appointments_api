import styles from "./AvailableHours.module.css";

const AvailableHours = ({ availableHours, selectedHours, onHourClick }) => {
  return (
    <div className={styles.availableHours}>
      {availableHours.map((hour) => (
        <button
          key={hour}
          className={`${styles.hour} ${
            selectedHours.includes(hour) ? styles.activeHour : ""
          }`}
          onClick={() => onHourClick(hour)}
          disabled={!availableHours.includes(hour)}
        >
          {hour}:00
        </button>
      ))}
    </div>
  );
};

export default AvailableHours;
