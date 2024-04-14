import { Link } from "react-router-dom";
import { ControlButton } from "../../components/controlButton/ControlButton";
import styles from "./Home.module.css";

export const Home = () => {
  return (
    <div className={styles.buttons}>
      <Link to="/appointments">
        <ControlButton buttonName={"Мои записи"} />
      </Link>
      <Link to="/bot-setting">
        <ControlButton buttonName={"Настроить бота"} />
      </Link>
      <Link to="/schedule">
        <ControlButton buttonName={"Расписание"} />
      </Link>
      <Link to="/services">
        <ControlButton buttonName={"Услуги"} />
      </Link>
    </div>
  );
};
