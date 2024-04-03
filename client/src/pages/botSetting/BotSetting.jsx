import { useEffect, useState } from "react";
import { GradientButton } from "../../components/gradientButton/GradientButton";
import { Header } from "../../components/header/Header";
import { InputForSettings } from "../../components/inputForSettings/InputForSettings";
import { Wrapper } from "../../components/wrapper/Wrapper";
import styles from "./BotSetting.module.css";

export const BotSetting = () => {
  const [botSetting, setBotSetting] = useState({
    botToken: "",
    botName: "",
    address: "",
  });
  const [botToken, setBotToken] = useState("");
  const [botName, setBotName] = useState("");
  const [address, setAddress] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const onClick = () => {
    if (isSaved) {
      setIsSaved(!isSaved);
      console.log(isSaved);
      console.log(botSetting);
    } else {
      setIsSaved(!isSaved);
      console.log(isSaved);
    }
  };

  useEffect(() => {
    setBotSetting({ botName, address, botToken });
  }, [botToken, botName, address]);

  return (
    <Wrapper wrapperClass={"wrapperForMobile"}>
      <Header firstLetter={"G"} />
      <h1 className={styles.title}>Настройка бота</h1>
      {isSaved ? (
        <div className={styles.setiingsBox}>
          <div className={styles.settingBox}>
            <p className={styles.settingText}>Имя : {botName}</p>
          </div>
          <div className={styles.settingBox}>
            <p className={styles.settingText}>Адрес : {address}</p>
          </div>
        </div>
      ) : (
        <div className={styles.setiingsBox}>
          <div className={styles.inputBox}>
            <h2 className={styles.inputTitle}>1. Скопируйте ваш token</h2>
            <InputForSettings
              setState={setBotToken}
              type="input"
              placeHolder={"token"}
            />
          </div>
          <div className={styles.inputBox}>
            <h2 className={styles.inputTitle}>2. Укажите имя для бота</h2>
            <InputForSettings
              setState={setBotName}
              type="input"
              placeHolder={"имя бота"}
            />
          </div>
          <div className={styles.inputBox}>
            <h2 className={styles.inputTitle}>3. Укажите адрес</h2>
            <InputForSettings setState={setAddress} placeHolder={"ваш адрес"} />
          </div>
        </div>
      )}
      <GradientButton
        onClick={() => {
          onClick();
        }}
        buttonName={isSaved ? "Редактировать" : "Сохранить"}
      />
    </Wrapper>
  );
};
