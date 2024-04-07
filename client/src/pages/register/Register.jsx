import { Wrapper } from "../../components/wrapper/Wrapper";
import { InputForAuth } from "../../components/inputForAuth/InputForAuth";
import { Link, useNavigate } from "react-router-dom";
import icon from "/icons/header_icon.svg";
import styles from "./Register.module.css";
import { useState } from "react";
import { register } from "../../modules/api_requests";
import { GradientButton } from "../../components/gradientButton/GradientButton";

export const Regitser = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    firstName: "",
  });
  const [isError, setIsError] = useState(false);

  return (
    <div>
      <Wrapper wrapperClass={"wrapperForMobile"}>
        <p className={styles.title}>Welcome</p>
        <img className={styles.icon} src={icon} alt="icon" />
        <div className={styles.inputsGap}>
          <InputForAuth
            setIsError={setIsError}
            setData={setUserData}
            name={"email"}
            data={userData}
            className={styles.input}
            type={"text"}
            placeHolder={"Email"}
          />
          <InputForAuth
            setIsError={setIsError}
            setData={setUserData}
            name={"password"}
            data={userData}
            className={styles.input}
            type={"password"}
            placeHolder={"Пароль"}
          />
          <InputForAuth
            setIsError={setIsError}
            setData={setUserData}
            name={"firstName"}
            data={userData}
            className={styles.input}
            type={"text"}
            placeHolder={"Имя"}
          />
        </div>
        <div className={styles.spaceButton}>
          <GradientButton
            buttonName={"Зарегистрироваться"}
            isdDsabled={isError}
            onClick={() => {
              register(userData)
                .then((responseData) => {
                  localStorage.setItem("token", responseData.token);
                  navigate("/");
                })
                .catch(() => {
                  setIsError(true);
                  setUserData({ email: "", password: "", firstName: "" });
                  console.log("err");
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
