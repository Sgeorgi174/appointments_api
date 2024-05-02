import { Button } from "@nextui-org/react";
import { PersonalMenuGroup } from "../../components/personalMenuGroup/PersonalMenuGroup";
import { BotMenuGroup } from "../../components/botMenuGroup/BotMenuGroup";

export const Settings = () => {
  return (
    <div className=" p-3 pt-6">
      <div className="w-full h-[65px] flex justify-between items-center rounded-xl bg-gradient-to-r from-indigo-400 to-cyan-400 p-3">
        <p>
          Быстрая настройка <br /> и запуск бота за 10 минут
        </p>
        <Button
          variant="light"
          className="text-white rounded-full shadow-md bg-[#808cf8]"
        >
          Начать
        </Button>
      </div>
      <PersonalMenuGroup />
      <BotMenuGroup />
    </div>
  );
};
