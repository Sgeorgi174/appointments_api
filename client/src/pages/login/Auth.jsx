import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../../redux/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";
import { Tabs, Tab } from "@nextui-org/react";
import { LoginForm } from "../../components/loginForm/LoginForm";
import { RegisterForm } from "../../components/registerForm/RegisterForm";

export const Auth = () => {
  const [selected, setSelected] = useState("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    firstName: "",
    confirmPassword: "",
  });
  const [loginUser, { data: userLogin, isLoading: isLoginLoading }] =
    useLoginUserMutation();
  const [registerUser, { data: userRegister, isLoading: isRegisterLoading }] =
    useRegisterUserMutation();

  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (userLogin) {
      dispatch(
        setUser({
          token: userLogin.token,
          name: userLogin.name,
          email: userLogin.email,
        })
      );
      navigate("/");
    }
  }, [userLogin]);

  useEffect(() => {
    if (userRegister) {
      dispatch(
        setUser({
          token: userRegister.token,
          name: userRegister.name,
          email: userRegister.email,
        })
      );
      navigate("/");
    }
  }, [userRegister]);

  const handleLoginClick = async () => {
    await loginUser({
      email: loginData.email,
      password: loginData.password,
    });
  };

  const handleRegisterClick = async () => {
    await registerUser({
      ...registerData,
    });
  };

  const handleClickChangeTab = (selected) => {
    selected === "login" ? setSelected("register") : setSelected("login");
  };

  return (
    <div className="w-screen flex justify-center items-baseline min-h-svh">
      <div className=" w-80 mt-20 min-h-96 bg-gray-50 flex flex-col items-center rounded-xl p-6">
        <p className=" mt-5 text-3xl text-black font-extrabold">Welcome</p>
        <Tabs
          selectedKey={selected}
          radius="full"
          onSelectionChange={setSelected}
          className=" mt-5"
          aria-label="Options"
          classNames={{
            tabList: " bg-black",
            tabContent: " text-white font-bold",
          }}
        >
          <Tab key="login" title="Вход"></Tab>
          <Tab key="register" title="Регистрация"></Tab>
        </Tabs>
        {selected === "login" && (
          <LoginForm
            isLoading={isLoginLoading}
            handleLoginClick={handleLoginClick}
            loginData={loginData}
            setLoginData={setLoginData}
            onPress={() => {
              handleClickChangeTab(selected);
            }}
          />
        )}
        {selected === "register" && (
          <RegisterForm
            isLoading={isRegisterLoading}
            handleRegisterClick={handleRegisterClick}
            registerData={registerData}
            setRegisterData={setRegisterData}
            onPress={() => {
              handleClickChangeTab(selected);
            }}
          />
        )}
      </div>
    </div>
  );
};
