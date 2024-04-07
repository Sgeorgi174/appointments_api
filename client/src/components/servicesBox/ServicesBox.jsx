import iconWorks from "/icons/works.svg";
import iconTimer from "/icons/timer.svg";
import iconRuble from "/icons/ruble.svg";
import styles from "./ServicesBox.module.css";

export const ServicesBox = ({ name, time, price, editClick, deleteClick }) => {
  return (
    <div className={styles.service}>
      <div className={styles.row}>
        <img className={styles.icon} src={iconWorks} alt="works_icon" />
        <p className={styles.text}>{name}</p>
      </div>
      <div className={styles.row}>
        <img className={styles.icon} src={iconTimer} alt="works_icon" />
        <p className={styles.text}>{time} мин</p>
      </div>
      <div className={styles.row}>
        <img className={styles.icon} src={iconRuble} alt="works_icon" />
        <p className={styles.text}>{price} руб</p>
      </div>
      <div className={styles.rowButton}>
        <button onClick={editClick} className={styles.button}>
          Редактировать
        </button>
        <button onClick={deleteClick} className={styles.button}>
          Удалить
        </button>
      </div>
    </div>
  );
};
