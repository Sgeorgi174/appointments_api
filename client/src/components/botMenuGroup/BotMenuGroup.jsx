import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Button, useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { ModalBotToken } from "../modalBotToken/ModalBotToken";
import { useGetSettingsQuery } from "../../redux/botSettingsApi";
import { Loader } from "../loader/Loader";
import { ModalGreetingSetting } from "../modalGreetingSetting/ModalGreetingSetting";

export const BotMenuGroup = () => {
  const [botSettings, setBotSettings] = useState({
    botToken: "",
    greetingText: "",
    greetingFileUrl: "",
    notificationText: "",
    notificationFileUrl: "",
  });

  const {
    refetch,
    isFetching,
    data: botSettingsData,
    isLoading,
  } = useGetSettingsQuery();

  useEffect(() => {
    if (botSettingsData) {
      setBotSettings(botSettingsData);
    }
  }, [botSettingsData]);

  const {
    isOpen: isOpenBotToken,
    onOpen: onOpenBotToken,
    onOpenChange: onOpenChangeBotToken,
  } = useDisclosure();

  const {
    isOpen: isOpenGreetingSetting,
    onOpen: onOpenGreetingSetting,
    onOpenChange: onOpenChangeGreetingSetting,
  } = useDisclosure();

  if (isLoading) return <Loader />;

  return (
    <div>
      <p className="mt-6 text-lg font-bold">Бот</p>
      <div className="flex flex-col rounded-xl mt-2 bg-[#313131] overflow-hidden w-full">
        <Button
          onClick={onOpenBotToken}
          className=" bg-transparent p-0 rounded-none"
        >
          <div className="flex w-full justify-between  items-center    p-2">
            <div className="flex items-center  gap-2">
              <div className="flex justify-center items-center w-[28px] h-[28px] bg-[#fe9500] rounded">
                <SmartToyIcon sx={{ color: "#fff", width: 20, height: 20 }} />
              </div>
              <p className="text-white">Token</p>
            </div>
            <ArrowForwardIosIcon
              sx={{ width: 15, height: 15, color: "#ffff" }}
            />
          </div>
        </Button>
        <div className="h-[1px] flex justify-end w-full">
          <div className="bg-[#454545] w-[80%] h-[1px]"></div>
        </div>
        <Button
          onClick={onOpenGreetingSetting}
          className=" bg-transparent p-0 rounded-none"
        >
          <div className="flex w-full justify-between  items-center p-2">
            <div className="flex  items-center gap-2">
              <div className="flex justify-center items-center w-[28px] h-[28px] bg-[#0064ff] rounded">
                <WavingHandIcon sx={{ color: "#fff", width: 20, height: 20 }} />
              </div>
              <p className="text-white">Приветственное сообщение</p>
            </div>
            <ArrowForwardIosIcon
              sx={{ width: 15, height: 15, color: "#ffff" }}
            />
          </div>
        </Button>
        <div className="h-[1px] flex justify-end w-full">
          <div className="bg-[#454545] w-[80%] h-[1px]"></div>
        </div>
        <Button className=" bg-transparent p-0 rounded-none">
          <div className="flex w-full justify-between items-center  p-2">
            <div className="flex items-center  gap-2">
              <div className="flex justify-center items-center w-[28px] h-[28px] bg-[#0064ff] rounded">
                <NotificationsIcon
                  sx={{ color: "#fff", width: 20, height: 20 }}
                />
              </div>
              <p className="text-white">Уведомления</p>
            </div>
            <ArrowForwardIosIcon
              sx={{ width: 15, height: 15, color: "#ffff" }}
            />
          </div>
        </Button>
      </div>
      <ModalBotToken
        isFetching={isFetching}
        refetch={refetch}
        botSettings={botSettings}
        isOpen={isOpenBotToken}
        onOpenChange={onOpenChangeBotToken}
      />
      <ModalGreetingSetting
        botSettings={botSettings}
        refetch={refetch}
        isFetching={isFetching}
        isOpen={isOpenGreetingSetting}
        onOpenChange={onOpenChangeGreetingSetting}
      />
    </div>
  );
};
