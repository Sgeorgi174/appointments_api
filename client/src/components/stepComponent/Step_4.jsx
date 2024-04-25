import { InputForSettings } from "../inputForSettings/InputForSettings";
import { TelegramWindow } from "../telegramWindow/TelegramWindow";
import { ImageUploader } from "../uploadImage/ImageUploader";
import styles from "./StepComponent.module.css";

export const Step_4 = ({
  botSetting,

  setBotSetting,
}) => {
  return (
    <div className={`${styles.settingBox} ${styles.slideInRight}`}>
      <p className={styles.title}>4. Настроим приветственное сообщение</p>
      <TelegramWindow text={botSetting.greetingText} command={"start"} />
      <InputForSettings
        placeHolder={"Приветственное сообщение"}
        value={botSetting.greetingText}
        setBotSetting={setBotSetting}
        name={"greetingText"}
        botSetting={botSetting}
      />
      <div className={styles.addImgBox}>
        <p className={styles.title}>
          5. Настроим картинку для приветствия
          <span>(*необязательно)</span>
        </p>
        <TelegramWindow
          text={botSetting.greetingText}
          file={botSetting.greetingFile}
          command={"start"}
        />
        <ImageUploader
          name={"greetingFile"}
          botSetting={botSetting}
          setBotSetting={setBotSetting}
        />
      </div>
    </div>
  );
};
