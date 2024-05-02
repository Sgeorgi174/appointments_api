import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Button } from "@nextui-org/react";

export const BotMenuGroup = () => {
  return (
    <div>
      <p className="mt-6 text-lg font-bold">Бот</p>
      <div className="flex flex-col rounded-xl mt-2 bg-[#313131] overflow-hidden w-full">
        <Button className=" bg-transparent p-0 rounded-none">
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
        <Button className=" bg-transparent p-0 rounded-none">
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
    </div>
  );
};
