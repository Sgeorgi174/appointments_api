import { useEffect, useState } from "react";
import styles from "./AvailableHours.module.css";
import { changeAvailabilityHour } from "../../modules/api_requests";
import { changeType } from "../../utils/changeTypes";

const AvailableHours = ({
  currentDay,
  setTypeToChanges,
  isAvailable,
  isUser,
  typeToChanges,
  setSchedule,
  setIsAvailable,
}) => {
  const [selectedHour, setSelectedHour] = useState({ index: "", id: "" });
  const [hoursList, setHoursList] = useState([]);

  useEffect(() => {
    setHoursList(currentDay);
    setSelectedHour("");
  }, [currentDay]);

  const handleHourClick = ({ event, id, index }) => {
    setSelectedHour({ id, index });

    changeType({
      event,
      className: "inactive",
      setTypeToChanges,
      setIsAvailable,
      type: "time",
    });
  };

  const handleClickChangeHour = (id) => {
    changeAvailabilityHour({ id }).then((res) => {
      setSchedule(res);
      setIsAvailable(!isAvailable);
    });
  };

  return (
    <>
      <div className={styles.clockContainer}>
        <div className={styles.clock}>
          {hoursList.map((hour, index) => {
            return (
              <button
                key={index}
                className={`${styles.hour} ${
                  !hour.isAvailable ? styles.inactive : ""
                } ${selectedHour.index === index ? styles.selectedHour : ""}`}
                onClick={(event) =>
                  handleHourClick({ event, id: hour.id, index })
                } //можно отдавать по айди
              >
                {hour.hour}:00
              </button>
            );
          })}
        </div>
      </div>
      {isUser && (
        <div
          className={
            typeToChanges === "time" ? styles.buttonsBox : styles.hidden
          }
        >
          <button
            className={`${styles.buttonChange}  ${
              isAvailable ? styles.buttonChange_disabled : ""
            }`}
            onClick={() => handleClickChangeHour(selectedHour.id)}
          >
            Доступно
          </button>
          <button
            className={`${styles.buttonChange} ${styles.buttonChange_un} ${
              isAvailable ? "" : styles.buttonChange_disabled
            }`}
            onClick={() => handleClickChangeHour(selectedHour.id)}
          >
            Недоступно
          </button>
        </div>
      )}
    </>
  );
};

export default AvailableHours;
