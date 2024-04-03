import styles from "./GradientButton.module.css";

export const GradientButton = ({ buttonName, onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {buttonName}
    </button>
  );
};
