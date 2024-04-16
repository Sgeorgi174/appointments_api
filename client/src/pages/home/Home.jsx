import { Link } from "react-router-dom";
import { ControlButton } from "../../components/controlButton/ControlButton";
import { GradientButton } from "../../components/gradientButton/GradientButton";
import { useEffect, useState } from "react";
import { startBot, stopBot } from "../../modules/api_requests";
import styles from "./Home.module.css";
import { useUser } from "../../hooks/useUser";

export const Home = () => {
  const [isStartedbot, setIsStartedBot] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setIsStartedBot(user.isStartBot);
    }
  }, [user]);

  const handleStartBot = () => {
    if (isStartedbot) {
      stopBot();
      setIsStartedBot(!isStartedbot);
    } else {
      startBot();
      setIsStartedBot(!isStartedbot);
    }
  };
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

      <div className={styles.botButtonBox}>
        <GradientButton
          buttonName={isStartedbot ? "Остановить бота" : "Запустить бота"}
          stopBot={isStartedbot}
          onClick={handleStartBot}
        />
      </div>
    </div>
  );
};
