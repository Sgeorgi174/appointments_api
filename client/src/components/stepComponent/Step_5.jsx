import { InputForSettings } from "../inputForSettings/InputForSettings";
import { TelegramWindow } from "../telegramWindow/TelegramWindow";
import { ImageUploader } from "../uploadImage/ImageUploader";
import styles from "./StepComponent.module.css";

export const Step_5 = ({
  botSetting,
  localError,
  setBotSetting,
  setLocalErrorState,
}) => {
  return (
    <div className={`${styles.settingBox} ${styles.slideInRight}`}>
      <p className={styles.title}>6. Настроим сообщение для уведомлений</p>
      <TelegramWindow
        text={botSetting.notificationText}
        command={"notification"}
      />
      <InputForSettings
        localError={localError}
        setLocalErrorState={setLocalErrorState}
        placeHolder={"Текст уведомления"}
        value={botSetting.notificationText}
        setBotSetting={setBotSetting}
        name={"notificationText"}
        botSetting={botSetting}
      />
      <p className={styles.additionalText}>
        Вы можете использовать конструкцию <span>-время-</span> , которая будет
        автоматически заменена на соответствующее время при отправке
        уведомления. <br /> Например: У вас запись на завтра в{" "}
        <span>-время-</span>. <br /> Станет: У вас запись на завтра в 18:00.
      </p>
      <div className={styles.addImgBox}>
        <p className={styles.title}>
          7. Настроим картинку для уведомления
          <span>(*необязательно)</span>
        </p>
        <TelegramWindow
          text={botSetting.notificationText}
          file={botSetting.notificationFile}
          command={"notification"}
        />
        <ImageUploader
          name={"notificationFile"}
          botSetting={botSetting}
          setBotSetting={setBotSetting}
        />
      </div>
    </div>
  );
};
