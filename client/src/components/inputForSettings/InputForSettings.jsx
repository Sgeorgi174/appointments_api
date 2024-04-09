import { useState } from "react";
import styles from "./InputForSettings.module.css";

export const InputForSettings = ({
  placeHolder,
  value,
  type,
  setBotSetting,
  name,
  botSetting,
}) => {
  const [error, setError] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;
    setBotSetting({ ...botSetting, [name]: value });
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
        name={name}
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
        name={name}
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
