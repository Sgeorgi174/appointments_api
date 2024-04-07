import { useState } from "react";
import { Header } from "../../components/header/Header";
import { Wrapper } from "../../components/wrapper/Wrapper";
import styles from "./Appointments.module.css";

const menuTabs = ["Сегодня", "Завтра", "Все"];

export const Appointments = () => {
  const [selectedTab, setSelectedTab] = useState(2);

  const onClickHandel = (index) => {
    setSelectedTab(index);
  };

  return (
    <Wrapper wrapperClass={"wrapperForMobile"}>
      <Header firstLetter={"Г"} />
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
    </Wrapper>
  );
};
