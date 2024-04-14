import { rightText } from "../../utils/rightTextForTelegramWindow";
import styles from "./TelegramWindow.module.css";

export const TelegramWindow = ({ text, file, command, imageLink }) => {
  return (
    <div className={styles.telegramWindowExample}>
      <div className={styles.header}>
        <div className={styles.leftSide}>
          <img src={"/icons/tgWindow/tgBack.svg"} alt="" />
        </div>
        <div className={styles.center}>
          <p className={styles.headerText}>Маришка</p>
          <p className={styles.headerUnderText}>бот</p>
        </div>

        <img
          className={styles.headerImg}
          src={"/icons/tgWindow/examplePhoto.jpeg"}
        ></img>
      </div>
      <div className={styles.content}>
        <div className={styles.myMessage}>
          <div className={styles.myMessageBlock}>
            <p className={styles.messageText}>{`/${command}`}</p>
            <p className={styles.messageTime}>18:12</p>
            <img src={"/icons/tgWindow/doubleCheck.svg"} alt="" />
          </div>
        </div>
        <div className={styles.answer}>
          <div className={styles.answerPhotoBox}>
            {file && (
              <img
                className={styles.answerPhoto}
                src={file.file ? URL.createObjectURL(file.file) : imageLink}
                alt=""
              />
            )}
          </div>
          <div className={styles.answerTextBox}>
            <p className={styles.messageAnswer}>
              {!text ? rightText(command) : text}
            </p>
          </div>
        </div>
        <div className={styles.inlineBtnExample}>
          <p className={styles.messageAnswer}>
            {command === "start" ? "Привет, начнем?" : "Назад"}
          </p>
        </div>
      </div>
      <div className={styles.footer}>
        <img src={"/icons/tgWindow/tgPaperClip.svg"} alt="" />

        <div className={styles.centerFooter}>
          <p className={styles.footerText}>Сообщение</p>
        </div>

        <img src={"/icons/tgWindow/tgMicrophone.svg"} alt="" />
      </div>
    </div>
  );
};
