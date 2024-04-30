import { Button, Input, Link } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "../eyeSlashFilledIcon";
import { EyeFilledIcon } from "../eyeFilledIcon";
import { useState } from "react";

export const RegisterForm = ({
  onPress,
  setRegisterData,
  registerData,
  isLoading,
  handleRegisterClick,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setRegisterData({ ...registerData, [name]: value });
  };
  return (
    <div className=" w-full flex flex-col gap-5  mt-5 items-center">
      <Input
        onChange={(e) => onChangeInput(e)}
        value={registerData.firstName}
        isRequired
        className="w-full"
        classNames={{ inputWrapper: "bg-default-300" }}
        name="firstName"
        labelPlacement="outside"
        type="text"
        label="Имя"
      />
      <Input
        onChange={(e) => onChangeInput(e)}
        value={registerData.email}
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
        value={registerData.password}
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
      <Input
        onChange={(e) => onChangeInput(e)}
        value={registerData.confirmPassword}
        isRequired
        className="w-full"
        classNames={{ inputWrapper: "bg-default-300" }}
        name="confirmPassword"
        label="Повторите пароль"
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
        onClick={handleRegisterClick}
        isLoading={isLoading}
        className="text-white bg-gradient-to-br from-green-400 to-blue-600 w-52  font-medium rounded-xl text-sm mt-7"
      >
        Зарегистрироваться
      </Button>
      <p className="text-center mt-10 text-black text-small">
        Уже есть аккаунт?{" "}
        <Link size="sm" onPress={onPress}>
          Войти
        </Link>
      </p>
    </div>
  );
};
