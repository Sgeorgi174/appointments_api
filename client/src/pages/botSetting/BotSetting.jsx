import { GradientButton } from "../../components/gradientButton/GradientButton";
import { Header } from "../../components/header/Header";
import { InputForSettings } from "../../components/inputForSettings/InputForSettings";
import { Wrapper } from "../../components/wrapper/Wrapper";
import styles from "./BotSetting.module.css";

export const BotSetting = () => {
  return (
    <Wrapper wrapperClass={"wrapperForMobile"}>
      <Header firstLetter={"G"} />
      <h1 className={styles.title}>Настройка бота</h1>
      <div className={styles.setiingsBox}>
        <div className={styles.setiingBox}>
          <h2 className={styles.inputTitle}>1. Скопируйте ваш token</h2>
          <InputForSettings placeHolder={"token"} />
        </div>
        <div className={styles.setiingBox}>
          <h2 className={styles.inputTitle}>2. Укажите имя для бота</h2>
          <InputForSettings placeHolder={"имя бота"} />
        </div>
        <div className={styles.setiingBox}>
          <h2 className={styles.inputTitle}>3. Укажите адрес</h2>
          <InputForSettings placeHolder={"ваш адрес"} />
        </div>
      </div>
      <GradientButton buttonName="Сохранить" />
    </Wrapper>
  );
};
