import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Wrapper } from "../../components/wrapper/Wrapper";
import { TextField } from "@mui/material";
import { useLoginUserMutation } from "../../redux/authApi";
import { CustomGradientButton } from "../../components/customGradientButton/CustomGradientButton";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";
import styles from "./Login.module.css";

export const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginUser, { data: user, isLoading, isError }] =
    useLoginUserMutation();

  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log(user);
      dispatch(setUser({ token: user.token, name: user.name }));
      navigate("/");
    }
  }, [user]);

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLoginClick = async () => {
    await loginUser({
      email: loginData.email,
      password: loginData.password,
    });
  };

  return (
    <div>
      <Wrapper wrapperClass={"wrapperForMobile_auth"}>
        <p className={styles.title}>Welcome</p>
        <TextField
          id="email-input"
          label="Email"
          variant="standard"
          sx={{ width: 250, mb: 3, mt: 5 }}
          name="email"
          type="text"
          value={loginData.email}
          onChange={(e) => onChangeInput(e)}
        />
        <TextField
          id="password-input"
          label="Пароль"
          variant="standard"
          sx={{ width: 250 }}
          name="password"
          type="password"
          value={loginData.password}
          onChange={(e) => onChangeInput(e)}
        />
        <CustomGradientButton
          buttonName={"Войти"}
          onClick={handleLoginClick}
          isLoading={isLoading}
        />

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
