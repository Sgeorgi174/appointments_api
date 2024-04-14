import { InputForSettings } from "../../components/inputForSettings/InputForSettings";
import ImageUploader from "../../components/uploadImage/ImageUploader";
import { TelegramWindow } from "../../components/telegramWindow/TelegramWindow";
import { InstructionToCreateBot } from "../../components/InstructionToCreateBot/InstructionToCreateBot";
import { useEffect, useState } from "react";
import styles from "./StepComponent.module.css";
import { createSettings } from "../../modules/api_requests";
import { createFormDateForSetting } from "../../utils/createFormDateForSetting";

export const StepComponent = ({ botSetting, setIsCreated, setBotSetting }) => {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (step === 1) {
      !isCheckboxChecked ? setError(true) : setError(false);
    }
    if (step === 2) {
      !botSetting.botToken ? setError(true) : setError(false);
    }
    if (step === 3) {
      !botSetting.address ? setError(true) : setError(false);
    }
    if (step === 4) {
      !botSetting.greetingText ? setError(true) : setError(false);
    }
    if (step === 5) {
      !botSetting.notificationText ? setError(true) : setError(false);
    }
  }, [isCheckboxChecked, step, botSetting]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };

  const handleBackClick = () => {
    setStep((prev) => prev - 1);
  };

  const handleContinueClick = () => {
    if (step < 5) {
      setStep((prev) => prev + 1);
    } else {
      createSettings(createFormDateForSetting(botSetting)).then((data) => {
        console.log(data);
      });
      setIsCreated(true);
    }
  };
  return (
    <div className={styles.settingsBox}>
      {/* Step 1: Checkbox */}
      {step === 1 && (
        <div className={`${styles.settingBox} ${styles.slideInRight}`}>
          <InstructionToCreateBot
            isCheckboxChecked={isCheckboxChecked}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
      )}

      {/* Step 2: Bot Token */}
      {step === 2 && (
        <div className={`${styles.settingBox} ${styles.slideInRight}`}>
          <p className={styles.title}>1. Скопируйте ваш token</p>
          <InputForSettings
            error={error}
            setError={setError}
            placeHolder={"token"}
            value={botSetting.botToken}
            setBotSetting={setBotSetting}
            name={"botToken"}
            botSetting={botSetting}
          />
        </div>
      )}

      {/* Step 3: Address */}
      {step === 3 && (
        <div className={`${styles.settingBox} ${styles.slideInRight}`}>
          <p className={styles.title}>2. Введите ваши контактные данные</p>
          <TelegramWindow text={botSetting.address} command={"address"} />
          <InputForSettings
            error={error}
            setError={setError}
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
      )}

      {/* Step 4: Greeting Message */}

      {step === 4 && (
        <div className={`${styles.settingBox} ${styles.slideInRight}`}>
          <p className={styles.title}>4. Настроим приветственное сообщение</p>
          <TelegramWindow text={botSetting.greetingText} command={"start"} />
          <InputForSettings
            error={error}
            setError={setError}
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
      )}

      {/* Step 5: Notification Message */}

      {step === 5 && (
        <div className={`${styles.settingBox} ${styles.slideInRight}`}>
          <p className={styles.title}>6. Настроим сообщение для уведомлений</p>
          <TelegramWindow
            text={botSetting.notificationText}
            command={"notification"}
          />
          <InputForSettings
            error={error}
            setError={setError}
            placeHolder={"Текст уведомления"}
            value={botSetting.notificationText}
            setBotSetting={setBotSetting}
            name={"notificationText"}
            botSetting={botSetting}
          />
          <p className={styles.additionalText}>
            Вы можете использовать конструкцию <span>-время-</span> , которая
            будет автоматически заменена на соответствующее время при отправке
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
      )}

      <div className={styles.buttonsRow}>
        {/* Back Button */}
        {step !== 1 && (
          <button
            onClick={handleBackClick}
            className={`${styles.button} ${styles.buttonBack}`}
            disabled={!isCheckboxChecked || step === 1}
          >
            <span>Назад</span>
          </button>
        )}

        {/* Continue Button */}
        {step === 1 && <div></div>}
        <button
          onClick={handleContinueClick}
          className={`${styles.button} ${styles.buttonNext}`}
          disabled={error}
        >
          <span>{step === 5 ? "Сохранить" : "Далее"}</span>
        </button>
      </div>
    </div>
  );
};
