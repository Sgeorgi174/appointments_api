import styles from "./GradientButton.module.css";

export const GradientButton = ({
  buttonName,
  onClick,
  isdDsabled,
  stopBot,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${isdDsabled ? styles.disabled : ""} ${
        stopBot ? styles.stopBot : ""
      } `}
    >
      {buttonName}
    </button>
  );
};
