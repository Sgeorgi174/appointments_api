import { useState } from "react";
import styles from "./InputForSettings.module.css";

export const InputForSettings = ({ placeHolder, setState }) => {
  const [value, setValue] = useState("");
  const onChange = (event) => {
    setValue(event.target.value);
    setState(event.target.value);
  };
  return (
    <input
      value={value}
      onChange={onChange}
      className={styles.input}
      placeholder={placeHolder}
      type="text"
    ></input>
  );
};
