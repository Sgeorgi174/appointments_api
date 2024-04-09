import { useEffect, useState } from "react";
import { GradientButton } from "../../components/gradientButton/GradientButton";
import { Header } from "../../components/header/Header";
import { InputForSettings } from "../../components/inputForSettings/InputForSettings";
import { Wrapper } from "../../components/wrapper/Wrapper";
import styles from "./BotSetting.module.css";
import ImageUploader from "../../components/uploadImage/ImageUploader";
import {
  createSettings,
  editSettings,
  getSettings,
} from "../../modules/api_requests";

export const BotSetting = () => {
  const [botSetting, setBotSetting] = useState({
    botToken: "",
    botName: "",
    address: "",
    file: null,
  });
  const [isSaved, setIsSaved] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  useEffect(() => {
    getSettings()
      .then((response) => {
        setIsSaved(true);
        setIsCreated(true);
        setBotSetting(response);
      })
      .catch(() => {
        setIsSaved(false);
        setIsCreated(false);
      });
  }, []);

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("botToken", botSetting.botToken);
    formDataToSend.append("botName", botSetting.botName);
    formDataToSend.append("address", botSetting.address);
    formDataToSend.append("file", botSetting.file);
    isCreated ? formDataToSend.append("id", botSetting.id) : "";

    return formDataToSend;
  };

  const onClickSave = async () => {
    console.log(isCreated);
    if (isCreated) {
      handleSubmit().then((formData) => {
        editSettings(formData)
          .then((data) => {
            setIsSaved(true);
            setBotSetting(data);
          })
          .catch((e) => {
            console.log(e);
          });
      });
    } else {
      await handleSubmit()
        .then((data) => {
          createSettings(data)
            .then((data) => {
              setIsSaved(true);
              setIsCreated(true);
              setBotSetting(data);
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .then(() => {
          setIsCreated(true);
          console.log(isCreated);
        });
    }
  };

  const onClickEdit = async () => {
    setIsSaved(false);
    console.log(isCreated);
    console.log(botSetting.id);
  };

  return (
    <Wrapper wrapperClass={"wrapperForMobile"}>
      <Header firstLetter={"G"} />
      <h1 className={styles.title}>Настройка бота</h1>
      {isSaved ? (
        <div className={styles.setiingsBox}>
          <div className={styles.settingBox}>
            <p className={styles.settingText}>Имя : {botSetting.botName}</p>
          </div>
          <div className={styles.settingBox}>
            <p className={styles.settingText}>Адрес : {botSetting.address}</p>
          </div>
          <div className={styles.settingBox}>
            <img
              className={styles.previewImage}
              src={`http://localhost:8000${botSetting.imgUrl}`}
            />
          </div>
        </div>
      ) : (
        <div className={styles.setiingsBox}>
          <div className={styles.inputBox}>
            <h2 className={styles.inputTitle}>1. Скопируйте ваш token</h2>
            <InputForSettings
              botSetting={botSetting}
              name={"botToken"}
              setBotSetting={setBotSetting}
              value={botSetting.botToken}
              type="input"
              placeHolder={"token"}
            />
          </div>
          <div className={styles.inputBox}>
            <h2 className={styles.inputTitle}>2. Укажите имя для бота</h2>
            <InputForSettings
              botSetting={botSetting}
              name={"botName"}
              setBotSetting={setBotSetting}
              value={botSetting.botName}
              type="input"
              placeHolder={"имя бота"}
            />
          </div>
          <div className={styles.inputBox}>
            <h2 className={styles.inputTitle}>3. Укажите адрес</h2>
            <InputForSettings
              botSetting={botSetting}
              name={"address"}
              setBotSetting={setBotSetting}
              value={botSetting.address}
              placeHolder={"ваш адрес"}
            />
          </div>
          <div className={styles.inputBox}>
            <h2 className={styles.inputTitle}>4. Выберете аватар для бота</h2>
            <ImageUploader
              handleSubmit={(e) => {
                handleSubmit(e);
              }}
              name={"file"}
              botSetting={botSetting}
              setBotSetting={setBotSetting}
            />
          </div>
        </div>
      )}
      <GradientButton
        onClick={() => {
          isSaved ? onClickEdit() : onClickSave();
        }}
        buttonName={isSaved ? "Редактировать" : "Сохранить"}
      />
    </Wrapper>
  );
};
