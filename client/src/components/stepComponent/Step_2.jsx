import { InputForSettings } from "../inputForSettings/InputForSettings";
import styles from "./StepComponent.module.css";

export const Step_2 = ({
  localError,
  setLocalErrorState,
  botSetting,
  setBotSetting,
}) => {
  return (
    <div className={`${styles.settingBox} ${styles.slideInRight}`}>
      <p className={styles.title}>1. Скопируйте ваш token</p>
      <InputForSettings
        localError={localError}
        setLocalErrorState={setLocalErrorState}
        placeHolder={"token"}
        value={botSetting.botToken}
        setBotSetting={setBotSetting}
        name={"botToken"}
        botSetting={botSetting}
      />
    </div>
  );
};
