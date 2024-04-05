import { formattedDateForHeader } from "../../utils/slicers";
import arrowIcon from "/icons/arrow_for_calendar.svg";
import styles from "./Calendar.module.css";

export const CalendarHeader = ({ setSelectedDate, selectedDate }) => {
  const handlePrevMonth = () => {
    const today = new Date();
    const prevMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() - 1,
      today.getDate()
    );
    if (prevMonth >= new Date(today.getFullYear(), today.getMonth(), 1)) {
      setSelectedDate(prevMonth);
    } else {
      return;
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
    <div className={styles.header}>
      <div className={styles.headerBox}>
        <button className={styles.switchButton} onClick={handlePrevMonth}>
          <img
            className={`${styles.arrowIcon} ${styles.arrowIcon_left}`}
            src={arrowIcon}
          />
        </button>
        {formattedDateForHeader(selectedDate)}
        <button className={styles.switchButton} onClick={handleNextMonth}>
          <img className={`${styles.arrowIcon}`} src={arrowIcon} />
        </button>
      </div>
    </div>
  );
};
