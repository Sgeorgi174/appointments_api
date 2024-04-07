import styles from "./InputForAuth.module.css";

export const InputForAuth = ({
  placeHolder,
  type,
  data,
  setData,
  name,
  value,
  setIsError,
}) => {
  const onChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
    setIsError(false);
  };
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      className={styles.input}
      placeholder={placeHolder}
      type={type}
    ></input>
  );
};
