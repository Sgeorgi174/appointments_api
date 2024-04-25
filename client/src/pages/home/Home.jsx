import { Zoom } from "@mui/material";
import { currentTime } from "../../utils/slicers";
import styles from "./Home.module.css";
import { useState, useEffect } from "react";

export const Home = () => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setChecked(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.content}>
      <h1 className={styles.title}>Добро пожаловать!</h1>
      <div className={styles.dialogBox}>
        <div className={styles.firstRow}>
          <Zoom in={checked} timeout={500}>
            {
              <div className={styles.startMessage}>
                <p className={styles.text}>/start</p>
                <p className={styles.time}>{currentTime()}</p>
              </div>
            }
          </Zoom>
        </div>
        <Zoom in={checked} timeout={1000}>
          <div className={styles.secondRow}>
            <img className={styles.imgBot} src="./img/bot_mobile.jpeg" alt="" />
            <div className={styles.secondMessage}>
              <p className={styles.text}>
                Всего 3 простых шага<br></br> и мы можем начинать работу !
              </p>
              <div className={styles.timeRow}>
                <p className={styles.time}>{currentTime()}</p>
              </div>
            </div>
            <div className={styles.thirdMessage}>
              <p className={styles.text}>
                1. Добавьте свои услуги <br />
                2. Создайте свое расписание <br />
                3. Настройте своего бота
              </p>
              <div className={styles.timeRow}>
                <p className={styles.time}>{currentTime()}</p>
              </div>
            </div>
          </div>
        </Zoom>
      </div>
    </div>
  );
};
