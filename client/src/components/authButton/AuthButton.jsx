import styles from "./AuthButton.module.css";

export const AuthButton = ({ buttonName, onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {buttonName}
    </button>
  );
};
