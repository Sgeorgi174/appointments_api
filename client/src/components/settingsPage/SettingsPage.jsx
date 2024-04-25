import { useEffect, useState } from "react";
import { TelegramWindow } from "../telegramWindow/TelegramWindow";
import { InputForSettings } from "../inputForSettings/InputForSettings";
import { editSettings } from "../../modules/api_requests";
import { createFormDateForSetting } from "../../utils/createFormDateForSetting";
import { ModalSettings } from "../modalSettings/ModalSettings";
import { ImageUploader } from "../uploadImage/ImageUploader";
import HelpIcon from "@mui/icons-material/Help";
import styles from "./SettingsPage.module.css";
import { SettingsTabs } from "../settingsTabs/SettingsTabs";
import { useCheckTokenMutation } from "../../redux/botTokenApi";
import { CustomGradientButton } from "../customGradientButton/CustomGradientButton";

export const SettingsPage = ({ botSetting, setBotSetting }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkToken, { isLoading }] = useCheckTokenMutation();

  const handelClickEdit = async () => {
    if (isEdit) {
      if (activeTab === 0) {
        try {
          await checkToken(botSetting.botToken).unwrap();
          setError(false);
          const data = await editSettings(createFormDateForSetting(botSetting));
          setBotSetting({ ...botSetting, data });
          setIsEdit(!isEdit);
        } catch (error) {
          setError(true);
          return;
        }
      }
    } else {
      setIsEdit(!isEdit);
    }
  };

  useEffect(() => {
    setPrevBotSetting(botSetting);
  }, [isEdit]);

  const [prevBotSetting, setPrevBotSetting] = useState(botSetting);

  const handleChange = (event, newValue) => {
    setBotSetting(prevBotSetting);
    setIsEdit(false);
    setActiveTab(newValue);
  };

  return (
    <div className={styles.settingsBox}>
      <ModalSettings
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <div className={styles.titleBox}>
        <h1 className={styles.settingsTitle}>Настройки бота </h1>
        <HelpIcon
          role="button"
          className={styles.helpIcon}
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <SettingsTabs value={activeTab} handleChange={handleChange} />
      {activeTab !== 0 ? (
        <TelegramWindow
          imageLink={
            activeTab === 1
              ? botSetting.addressFileUrl
              : activeTab === 2
              ? botSetting.greetingFileUrl
              : activeTab === 3
              ? botSetting.notificationFileUrl
              : "sds"
          }
          command={
            activeTab === 1
              ? "address"
              : activeTab === 2
              ? "start"
              : activeTab === 3
              ? "notifaction"
              : ""
          }
          file={
            activeTab === 1
              ? botSetting.addressFile || botSetting.addressFileUrl
              : activeTab === 2
              ? botSetting.greetingFile || botSetting.greetingFileUrl
              : activeTab === 3
              ? botSetting.notificationFile || botSetting.notificationFileUrl
              : ""
          }
          text={
            activeTab === 1
              ? botSetting.address
              : activeTab === 2
              ? botSetting.greetingText
              : activeTab === 3
              ? botSetting.notificationText
              : ""
          }
        />
      ) : (
        <div className={styles.tokenBox}>
          <p>
            {botSetting.botToken.length > 20
              ? botSetting.botToken.slice(0, 20) + "..."
              : botSetting.botToken}
          </p>
        </div>
      )}
      {isEdit && (
        <div className={styles.inputBox}>
          <InputForSettings
            error={error}
            setError={setError}
            placeHolder={
              activeTab === 0
                ? "token"
                : activeTab === 1
                ? "Контактные данные"
                : activeTab === 2
                ? "Приветственное сообщение"
                : "Текст уведомления"
            }
            value={
              activeTab === 0
                ? botSetting.botToken
                : activeTab === 1
                ? botSetting.address
                : activeTab === 2
                ? botSetting.greetingText
                : botSetting.notificationText
            }
            setBotSetting={setBotSetting}
            name={
              activeTab === 0
                ? "botToken"
                : activeTab === 1
                ? "address"
                : activeTab === 2
                ? "greetingText"
                : "notificationText"
            }
            botSetting={botSetting}
          />
          {activeTab !== 0 && (
            <ImageUploader
              name={
                activeTab === 0
                  ? "botToken"
                  : activeTab === 1
                  ? "addressFile"
                  : activeTab === 2
                  ? "greetingFile"
                  : "notificationFile"
              }
              currentKey={
                activeTab === 0
                  ? "botToken"
                  : activeTab === 1
                  ? "addressFileUrl"
                  : activeTab === 2
                  ? "greetingFileUrl"
                  : "notificationFileUrl"
              }
              imageUrl={
                activeTab === 1
                  ? botSetting.addressFileUrl
                  : activeTab === 2
                  ? botSetting.greetingFileUrl
                  : activeTab === 3
                  ? botSetting.notificationFileUrl
                  : ""
              }
              botSetting={botSetting}
              setBotSetting={setBotSetting}
            />
          )}
        </div>
      )}
      <div className={styles.buttonRow}>
        <CustomGradientButton
          isLoading={isLoading}
          onClick={handelClickEdit}
          buttonName={isEdit ? "Сохранить" : "Редактировать"}
        />
      </div>
    </div>
  );
};
