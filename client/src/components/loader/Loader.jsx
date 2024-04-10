import HashLoader from "react-spinners/HashLoader";
import styles from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <HashLoader size={250} color="#7c36d6" />
    </div>
  );
};
