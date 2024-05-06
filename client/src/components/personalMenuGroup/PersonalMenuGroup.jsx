import CallIcon from "@mui/icons-material/Call";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Person2Icon from "@mui/icons-material/Person2";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button, useDisclosure } from "@nextui-org/react";
import { ModalProfile } from "../modalProfile/ModalProfile";
import { ModalServices } from "../modalSevices/ModalServices";
import { ModalContacts } from "../modalContacts/ModalContacts";

export const PersonalMenuGroup = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenServices,
    onOpen: onOpenServices,
    onOpenChange: onOpenChangeSevices,
  } = useDisclosure();
  const {
    isOpen: isOpenContacts,
    onOpen: onOpenContacts,
    onOpenChange: onOpenChangeContacts,
  } = useDisclosure();

  return (
    <div>
      <p className="mt-6 text-lg font-bold">Основные</p>
      <div className="flex flex-col rounded-xl mt-2 bg-[#313131] overflow-hidden w-full">
        <Button onClick={onOpen} className=" bg-transparent p-0 rounded-none">
          <div className="flex w-full justify-between  items-center    p-2">
            <div className="flex items-center  gap-2">
              <div className="flex justify-center items-center w-[28px] h-[28px] bg-[#2c9935] rounded">
                <Person2Icon sx={{ color: "#fff", width: 20, height: 20 }} />
              </div>
              <p className="text-white">Профиль</p>
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
          onClick={onOpenServices}
          className=" bg-transparent p-0 rounded-none"
        >
          <div className="flex w-full justify-between  items-center p-2">
            <div className="flex  items-center gap-2">
              <div className="flex justify-center items-center w-[28px] h-[28px] bg-[#d1b20e] rounded">
                <PlaylistAddIcon
                  sx={{ color: "#fff", width: 20, height: 20 }}
                />
              </div>
              <p className="text-white">Услуги</p>
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
          onClick={onOpenContacts}
          className=" bg-transparent p-0 rounded-none"
        >
          <div className="flex w-full justify-between items-center  p-2">
            <div className="flex items-center  gap-2">
              <div className="flex justify-center items-center w-[28px] h-[28px] bg-[#0064ff] rounded">
                <CallIcon sx={{ color: "#fff", width: 20, height: 20 }} />
              </div>
              <p className="text-white">Контактные данные</p>
            </div>
            <ArrowForwardIosIcon
              sx={{ width: 15, height: 15, color: "#ffff" }}
            />
          </div>
        </Button>
      </div>
      <ModalProfile isOpen={isOpen} onOpenChange={onOpenChange} />
      <ModalServices
        isOpen={isOpenServices}
        onOpenChange={onOpenChangeSevices}
      />
      <ModalContacts
        isOpen={isOpenContacts}
        onOpenChange={onOpenChangeContacts}
      />
    </div>
  );
};
