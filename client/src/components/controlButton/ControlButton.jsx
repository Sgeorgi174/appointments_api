import styles from "./ControlButton.module.css";

export const ControlButton = ({ buttonName, onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {buttonName}
    </button>
  );
};
