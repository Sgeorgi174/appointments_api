import { Wrapper } from "../../components/wrapper/Wrapper";
import { InputForAuth } from "../../components/inputForAuth/InputForAuth";
import { Link, useNavigate } from "react-router-dom";
import icon from "/icons/header_icon.svg";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import { login } from "../../modules/api_requests";
import { GradientButton } from "../../components/gradientButton/GradientButton";

export const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    setLoginData({ email, password });
  }, [email, password]);

  return (
    <div>
      <Wrapper wrapperClass={"wrapperForMobile_auth"}>
        <p className={styles.title}>Welcome</p>
        <img className={styles.icon} src={icon} alt="icon" />
        <InputForAuth setState={setEmail} type={"text"} placeHolder={"Email"} />
        <div className={styles.spaceInput}>
          <InputForAuth
            setState={setPassword}
            className={styles.input}
            type={"password"}
            placeHolder={"Пароль"}
          />
        </div>
        <div className={styles.spaceButton}>
          <GradientButton
            buttonName={"Войти"}
            onClick={() => {
              login(loginData).then(() => {
                navigate("/");
              });
            }}
          />
        </div>
        <Link to={"/register"} className={styles.link}>
          <p className={styles.text}>Нет аккаунта? Зарегестрироваться!</p>
        </Link>
      </Wrapper>
    </div>
  );
};
