import { useEffect, useState } from "react";
import { GradientButton } from "../gradientButton/GradientButton";
import styles from "./CreateCalendar.module.css";
import WeekdaysCheckbox from "../weekdaysCheckbox/WeekdaysCheckbox";
import TimePicker from "../timePicker/TimePicker";
import { createSchedule } from "../../modules/api_requests";

export const CreateCalendar = ({ setCreated, setIsLoading }) => {
  const [isСonfigured, setIsСonfigured] = useState(true);
  const [selectedFirstTime, setSelectedFirstTime] = useState("10:00");
  const [selectedSecondTime, setSelectedSecondTime] = useState("10:00");
  const [selectedDays, setSelectedDays] = useState([]);
  const [settingData, setSettingData] = useState({});
  const [isError, setIsError] = useState(false);

  const handleFirstTimeChange = (e) => {
    setSelectedFirstTime(e.target.value);
    setIsError(false);
  };

  const handleSecondTimeChange = (e) => {
    setSelectedSecondTime(e.target.value);
    setIsError(false);
  };

  const handleClick = () => {
    return setIsСonfigured(!isСonfigured);
  };

  const handleCreateClick = () => {
    createSchedule(settingData)
      .then(() => {
        setIsError(false);
        setIsСonfigured(!isСonfigured);
        setCreated(true);
        setIsLoading(true);
      })
      .catch((e) => {
        console.log(e.message);
        setIsСonfigured(false);
        setIsError(true);
      });
  };

  useEffect(() => {
    setSettingData({
      weekdays: selectedDays,
      startHour: parseInt(selectedFirstTime.slice(0, 2)),
      endHour: parseInt(selectedSecondTime.slice(0, 2)),
    });
  }, [selectedFirstTime, selectedSecondTime, selectedDays]);

  useEffect(() => {
    setSelectedDays([]);
  }, []);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    const dayIndex = {
      monday: "1",
      tuesday: "2",
      wednesday: "3",
      thursday: "4",
      friday: "5",
      saturday: "6",
      sunday: "0",
    }[name];

    if (checked) {
      setSelectedDays((prevSelectedDays) => [...prevSelectedDays, dayIndex]);
    } else {
      setSelectedDays((prevSelectedDays) =>
        prevSelectedDays.filter((day) => day !== dayIndex)
      );
    }
    console.log(selectedDays);
  };

  return (
    <div className={styles.calendarBox}>
      {isСonfigured ? (
        <>
          <h2 className={styles.title}>У вас еще нет расписания</h2>
          <GradientButton
            buttonName={"Создать"}
            onClick={() => {
              handleClick();
            }}
          />
        </>
      ) : (
        <>
          <h2 className={styles.titleSettings}>Укажите рабочие дни недели</h2>
          <WeekdaysCheckbox
            selectedDays={selectedDays}
            handleChange={(event) => {
              handleChange(event);
            }}
          />
          <h2 className={styles.titleSettings}>Укажите рабочее время</h2>
          <div className={styles.timeBox}>
            <TimePicker
              selectedTime={selectedFirstTime}
              handleTimeChange={(event) => {
                handleFirstTimeChange(event);
              }}
            />
            <p className={styles.space}>-</p>
            <TimePicker
              selectedTime={selectedSecondTime}
              handleTimeChange={(event) => {
                handleSecondTimeChange(event);
              }}
            />
          </div>
          <div className={styles.errorBox}>
            <p className={styles.error}>
              {isError ? (
                `* (Дата завершения должна быть позже даты начала)`
              ) : (
                <br></br>
              )}
            </p>
          </div>
          <GradientButton
            isdDsabled={isError}
            buttonName={"Создать"}
            onClick={() => {
              handleCreateClick();
            }}
          />
        </>
      )}
    </div>
  );
};
