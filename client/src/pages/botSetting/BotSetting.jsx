import { useEffect, useState } from "react";
import { StepComponent } from "../../components/stepComponent/StepComponent";
import styles from "./BotSetting.module.css";
import { SettingsPage } from "../../components/settingsPage/SettingsPage";
import { getSettings } from "../../modules/api_requests";

export const BotSetting = () => {
  const [isCreated, setIsCreated] = useState(false);
  const [botSetting, setBotSetting] = useState({
    botToken: "",
    address: "",
    addressFile: null,
    addressFileUrl: "",
    greetingText: "",
    greetingFile: null,
    greetingFileUrl: "",
    notificationText: "",
    notificationFile: null,
    notificationFileUrl: "",
  });

  useEffect(() => {
    getSettings()
      .then((data) => {
        setIsCreated(true);
        setBotSetting(data);
      })
      .catch(() => {
        setIsCreated(false);
      });
  }, []);

  return (
    <div className={styles.botSettingContainer}>
      {!isCreated ? (
        <StepComponent
          botSetting={botSetting}
          setIsCreated={setIsCreated}
          setBotSetting={setBotSetting}
        />
      ) : (
        <SettingsPage botSetting={botSetting} setBotSetting={setBotSetting} />
      )}
    </div>
  );
};
