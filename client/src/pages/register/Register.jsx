import { Wrapper } from "../../components/wrapper/Wrapper";
import { Link, useNavigate } from "react-router-dom";
import icon from "/icons/header_icon.svg";
import styles from "./Register.module.css";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { CustomGradientButton } from "../../components/customGradientButton/CustomGradientButton";
import { useRegisterUserMutation } from "../../redux/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";

export const Regitser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    firstName: "",
  });
  const [registerUser, { data: user, isLoading }] = useRegisterUserMutation();

  useEffect(() => {
    if (user) {
      console.log(user);
      dispatch(setUser({ token: user.token, name: user.name }));
      navigate("/");
    }
  }, [user]);

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleLoginClick = async () => {
    await registerUser({
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
    });
  };

  return (
    <div>
      <Wrapper wrapperClass={"wrapperForMobile_auth"}>
        <img className={styles.icon} src={icon} alt="icon" />

        <TextField
          id="email-input"
          label="Email"
          variant="standard"
          sx={{ width: 250, mb: 3 }}
          name="email"
          type="text"
          value={userData.email}
          onChange={(e) => onChangeInput(e)}
        />
        <TextField
          id="password-input"
          label="Пароль"
          variant="standard"
          sx={{ width: 250, mb: 3 }}
          name="password"
          type="password"
          value={userData.password}
          onChange={(e) => onChangeInput(e)}
        />
        <TextField
          id="name-input"
          label="Имя"
          variant="standard"
          sx={{ width: 250, mb: 3 }}
          name="firstName"
          type="text"
          value={userData.firstName}
          onChange={(e) => onChangeInput(e)}
        />

        <CustomGradientButton
          buttonName={"Зарегистрироваться"}
          onClick={handleLoginClick}
          isLoading={isLoading}
        />
        <Link to={"/login"} className={styles.link}>
          <p className={styles.text}>Есть аккаунт? Войти!</p>
        </Link>
      </Wrapper>
    </div>
  );
};
