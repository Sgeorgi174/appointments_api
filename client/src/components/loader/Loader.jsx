import { Triangle } from "react-loader-spinner";
import styles from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <Triangle
        visible={true}
        height="150"
        width="150"
        color="#A338FE"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};
