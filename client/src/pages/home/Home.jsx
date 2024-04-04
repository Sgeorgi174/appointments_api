import { Link } from "react-router-dom";
import { ControlButton } from "../../components/controlButton/ControlButton";
import { Header } from "../../components/header/Header";
import { Wrapper } from "../../components/wrapper/Wrapper";
import styles from "./Home.module.css";

export const Home = () => {
  return (
    <Wrapper wrapperClass={"wrapperForMobile"}>
      <Header firstLetter={"Ю"} />
      <div className={styles.buttons}>
        <Link>
          <ControlButton buttonName={"Мои записи"} />
        </Link>
        <Link to="/bot-setting">
          <ControlButton buttonName={"Настроить бота"} />
        </Link>
        <Link to="/schedule">
          <ControlButton buttonName={"Расписание"} />
        </Link>
        <Link>
          <ControlButton buttonName={"Услуги"} />
        </Link>
      </div>
    </Wrapper>
  );
};
