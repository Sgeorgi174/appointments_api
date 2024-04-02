import styles from "./Wrapper.module.css";

export const Wrapper = ({ wrapperClass, children }) => {
  return (
    <div className={styles.box}>
      <div className={`${styles.wrapper} ${styles[wrapperClass]}`}>
        {children}
      </div>
    </div>
  );
};
