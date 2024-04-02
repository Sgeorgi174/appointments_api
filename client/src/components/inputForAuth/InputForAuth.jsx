import { useState } from "react";
import styles from "./InputForAuth.module.css";

export const InputForAuth = ({ placeHolder, type, setState }) => {
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
      type={type}
    ></input>
  );
};
