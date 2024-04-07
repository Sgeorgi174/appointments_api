import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../modules/api_requests";
import { GradientButton } from "../../components/gradientButton/GradientButton";
import { Wrapper } from "../../components/wrapper/Wrapper";
import { InputForAuth } from "../../components/inputForAuth/InputForAuth";
import icon from "/icons/header_icon.svg";
import styles from "./Login.module.css";

export const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [isError, setIsError] = useState(false);
  let navigate = useNavigate();

  // useEffect(() => {
  //   setIsError(false);
  // }, [loginData]);

  return (
    <div>
      <Wrapper wrapperClass={"wrapperForMobile_auth"}>
        <p className={styles.title}>Welcome</p>
        <img className={styles.icon} src={icon} alt="icon" />
        <InputForAuth
          setIsError={setIsError}
          value={loginData.email}
          data={loginData}
          setData={setLoginData}
          name={"email"}
          type={"text"}
          placeHolder={"Email"}
        />
        <div className={styles.spaceInput}>
          <InputForAuth
            setIsError={setIsError}
            value={loginData.password}
            data={loginData}
            setData={setLoginData}
            name={"password"}
            className={styles.input}
            type={"password"}
            placeHolder={"Пароль"}
          />
        </div>
        <div className={styles.spaceButton}>
          <GradientButton
            isdDsabled={isError}
            buttonName={"Войти"}
            onClick={() => {
              login(loginData)
                .then((responseData) => {
                  localStorage.setItem("token", responseData.token);
                  navigate("/");
                })
                .catch(() => {
                  setIsError(true);
                  setLoginData({ email: "", password: "" });
                  console.log("err");
                });
            }}
          />
        </div>
        <div className={styles.errorBox}>
          <p className={styles.error}>
            {isError ? `* (неверная почта или пароль)` : <br></br>}
          </p>
        </div>
        <Link to={"/register"} className={styles.link}>
          <p className={styles.text}>Нет аккаунта? Зарегестрироваться!</p>
        </Link>
      </Wrapper>
    </div>
  );
};
