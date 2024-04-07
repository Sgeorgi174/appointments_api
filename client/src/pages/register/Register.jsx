import { Wrapper } from "../../components/wrapper/Wrapper";
import { InputForAuth } from "../../components/inputForAuth/InputForAuth";
import { Link, useNavigate } from "react-router-dom";
import icon from "/icons/header_icon.svg";
import styles from "./Register.module.css";
import { useEffect, useState } from "react";
import { register } from "../../modules/api_requests";
import { GradientButton } from "../../components/gradientButton/GradientButton";

export const Regitser = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    setUserData({ email, password, firstName });
  }, [email, password, firstName]);

  return (
    <div>
      <Wrapper wrapperClass={"wrapperForMobile"}>
        <p className={styles.title}>Welcome</p>
        <img className={styles.icon} src={icon} alt="icon" />
        <div className={styles.inputsGap}>
          <InputForAuth
            setState={setEmail}
            className={styles.input}
            type={"text"}
            placeHolder={"Email"}
          />
          <InputForAuth
            setState={setPassword}
            className={styles.input}
            type={"password"}
            placeHolder={"Пароль"}
          />
          <InputForAuth
            setState={setFirstName}
            className={styles.input}
            type={"text"}
            placeHolder={"Имя"}
          />
        </div>
        <div className={styles.spaceButton}>
          <GradientButton
            buttonName={"Зарегистрироваться"}
            onClick={() => {
              register(userData).then((responseData) => {
                localStorage.setItem("token", responseData.token);
                navigate("/");
              });
            }}
          />
        </div>
        <Link to={"/login"} className={styles.link}>
          <p className={styles.text}>Есть аккаунт? Войти!</p>
        </Link>
      </Wrapper>
    </div>
  );
};
