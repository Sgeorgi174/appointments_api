// В InputForSettings.js

import { useState, useRef, useEffect } from "react";
import styles from "./InputForSettings.module.css";

export const InputForSettings = ({
  placeHolder,
  value,
  type,
  setBotSetting,
  name,
  botSetting,
}) => {
  const [blurError, setBlurError] = useState(false);
  const [textareaValue, setTextareaValue] = useState(value); // Состояние для обработки переходов на новую строку
  const textareaRef = useRef(null);

  useEffect(() => {
    // Устанавливаем высоту textarea в зависимости от содержимого при монтировании компонента
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [textareaValue]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setBotSetting({ ...botSetting, [name]: value });
    setBlurError(false);
    setTextareaValue(value); // Обновляем состояние значения textarea
  };

  const onBlur = () => {
    if (!textareaValue.trim()) {
      setBlurError(true); // Установка ошибки, если значение пустое или состоит только из пробелов
    }
  };

  return type ? (
    <div className={styles.inputWrapper}>
      <input
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`${styles.input} ${blurError ? styles.error : ""}`}
        placeholder={placeHolder}
        type="text"
      />
      {blurError && (
        <span className={styles.errorText}>Заполните обязательные поля</span>
      )}
    </div>
  ) : (
    <div className={styles.inputWrapper}>
      <textarea
        ref={textareaRef}
        name={name}
        value={textareaValue} // Используем состояние textareaValue вместо value
        onChange={onChange}
        onBlur={onBlur}
        className={`${styles.input} ${styles.textarea} ${
          blurError ? styles.error : ""
        }`}
        placeholder={placeHolder}
      />
      {blurError && (
        <span className={styles.errorText}>Заполните обязательные поля</span>
      )}
    </div>
  );
};
