import { useEffect, useState } from "react";
import { GradientButton } from "../gradientButton/GradientButton";
import styles from "./CreateCalendar.module.css";
import WeekdaysCheckbox from "../weekdaysCheckbox/WeekdaysCheckbox";
import TimePicker from "../timePicker/TimePicker";

export const CreateCalendar = () => {
  const [isСonfigured, setIsСonfigured] = useState(false);
  const [selectedFirstTime, setSelectedFirstTime] = useState("10:00");
  const [selectedSecondTime, setSelectedSecondTime] = useState("10:00");
  const [selectedDays, setSelectedDays] = useState([]);
  const [settingData, setSettingData] = useState({});

  const handleFirstTimeChange = (e) => {
    setSelectedFirstTime(e.target.value);
  };

  const handleSecondTimeChange = (e) => {
    setSelectedSecondTime(e.target.value);
  };

  const handleClick = () => {
    // setIsСonfigured(!isСonfigured);

    console.log(settingData);
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
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
      sunday: 0,
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
          <GradientButton
            buttonName={"Создать"}
            onClick={() => {
              handleClick();
            }}
          />
        </>
      )}
    </div>
  );
};
