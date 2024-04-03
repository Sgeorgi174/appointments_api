import { useState } from "react";
import styles from "./InputForSettings.module.css";

export const InputForSettings = ({ placeHolder, setState, type }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const onChange = (event) => {
    setValue(event.target.value);
    setState(event.target.value);
    setError(false); // Сброс ошибки при изменении значения
  };

  const onBlur = () => {
    if (!value.trim()) {
      setError(true); // Установка ошибки, если значение пустое или состоит только из пробелов
    }
  };

  return type ? (
    <div className={styles.inputWrapper}>
      <input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`${styles.input} ${error ? styles.error : ""}`}
        placeholder={placeHolder}
        type="text"
      />
      {error && (
        <span className={styles.errorText}>Заполните обязательные поля</span>
      )}
    </div>
  ) : (
    <div className={styles.inputWrapper}>
      <textarea
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`${styles.input} ${error ? styles.error : ""}`}
        placeholder={placeHolder}
        type="text"
      />
      {error && (
        <span className={styles.errorText}>Заполните обязательные поля</span>
      )}
    </div>
  );
};
