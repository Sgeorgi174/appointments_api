import { InputForSettings } from "../inputForSettings/InputForSettings";
import { TelegramWindow } from "../telegramWindow/TelegramWindow";
import { ImageUploader } from "../uploadImage/ImageUploader";
import styles from "./StepComponent.module.css";

export const Step_3 = ({
  botSetting,

  setBotSetting,
}) => {
  return (
    <div className={`${styles.settingBox} ${styles.slideInRight}`}>
      <p className={styles.title}>2. Введите ваши контактные данные</p>
      <TelegramWindow text={botSetting.address} command={"address"} />
      <InputForSettings
        placeHolder={"Адрес"}
        value={botSetting.address}
        setBotSetting={setBotSetting}
        name={"address"}
        botSetting={botSetting}
      />
      <div className={styles.addressImgBox}>
        <p className={`${styles.title}`}>
          3. Добавьте фото с карт<span>(*необязательно)</span>
        </p>
        <TelegramWindow
          text={botSetting.address}
          file={botSetting.addressFile}
          command={"address"}
        />
        <ImageUploader
          name={"addressFile"}
          botSetting={botSetting}
          setBotSetting={setBotSetting}
        />
      </div>
    </div>
  );
};
