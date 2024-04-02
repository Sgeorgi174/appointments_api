import { ControlButton } from "../../components/controlButton/ControlButton";
import { Header } from "../../components/header/Header";
import { Wrapper } from "../../components/wrapper/Wrapper";
import styles from "./Home.module.css";

export const Home = () => {
  return (
    <Wrapper wrapperClass={"wrapperForMobile"}>
      <Header firstLetter={"Ю"} />
      <div className={styles.buttons}>
        <ControlButton buttonName={"Мои записи"} />
        <ControlButton buttonName={"Настроить бота"} />
        <ControlButton buttonName={"Настройка услуг"} />
        <ControlButton buttonName={"Расписание"} />
      </div>
    </Wrapper>
  );
};
