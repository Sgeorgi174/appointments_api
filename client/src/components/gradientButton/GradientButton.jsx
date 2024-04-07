import styles from "./GradientButton.module.css";

export const GradientButton = ({ buttonName, onClick, isdDsabled }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${isdDsabled ? styles.disabled : ""} `}
    >
      {buttonName}
    </button>
  );
};
