import { useState } from "react";
import styles from "./Appointments.module.css";

const menuTabs = ["Сегодня", "Завтра", "Все"];

export const Appointments = () => {
  const [selectedTab, setSelectedTab] = useState(2);

  const onClickHandel = (index) => {
    setSelectedTab(index);
  };

  return (
    <>
      <h2 className={styles.title}>Мои записи</h2>
      <div className={styles.daysButtonsBox}>
        {menuTabs.map((el, index) => {
          return (
            <button
              className={`${styles.tabButton} ${
                selectedTab === index ? styles.activeTab : ""
              }`}
              onClick={() => {
                onClickHandel(index);
              }}
              key={index}
            >
              {el}
            </button>
          );
        })}
      </div>
    </>
  );
};
