import { Button, Input, Link } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "../eyeSlashFilledIcon";
import { EyeFilledIcon } from "../eyeFilledIcon";
import { useState } from "react";

export const LoginForm = ({
  onPress,
  setLoginData,
  loginData,
  isLoading,
  handleLoginClick,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };
  return (
    <div className=" w-full flex flex-col gap-5  mt-5 items-center">
      <Input
        onChange={(e) => onChangeInput(e)}
        value={loginData.email}
        isRequired
        className="w-full"
        classNames={{ inputWrapper: "bg-default-300" }}
        name="email"
        labelPlacement="outside"
        type="email"
        label="Email"
      />
      <Input
        onChange={(e) => onChangeInput(e)}
        value={loginData.password}
        isRequired
        className="w-full"
        classNames={{ inputWrapper: "bg-default-300" }}
        name="password"
        label="Пароль"
        labelPlacement="outside"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
      />
      <Button
        onClick={handleLoginClick}
        isLoading={isLoading}
        className="text-white bg-gradient-to-br from-green-400 to-blue-600 w-52  font-medium rounded-xl text-sm mt-7"
      >
        Войти
      </Button>
      <p className="text-center mt-10 text-black text-small">
        Нет аккаунта?{" "}
        <Link size="sm" onPress={onPress}>
          Зарегистрироваться
        </Link>
      </p>
    </div>
  );
};
