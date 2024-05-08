import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import HomeIcon from "@mui/icons-material/Home";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import PhoneIcon from "@mui/icons-material/Phone";
import { useEffect, useState } from "react";
import { ModalEditContacts } from "../modalEditContacts/ModalEditContacts";
import { useGetContactQuery } from "../../redux/contactsInfoApi";
import { Loader } from "../loader/Loader";
import { formatPhoneNumber } from "../../utils/formatPhoneNumber";

export const ModalContacts = ({ isOpen, onOpenChange }) => {
  const [selectedItem, setSelectedItem] = useState({});
  const [contactsInfo, setContactsInfo] = useState({
    address: "",
    telNumber: "",
    instagram: "",
    vk: "",
  });

  const {
    refetch,
    isFetching,
    data: contactsData,
    isLoading,
  } = useGetContactQuery();

  const {
    isOpen: isOpenEditContacts,
    onOpen: onOpenEditContacts,
    onOpenChange: onOpenChangeEditContacts,
  } = useDisclosure();

  useEffect(() => {
    if (contactsData) {
      setContactsInfo(contactsData[0]);
    }
  }, [contactsData]);

  const handleClickSelect = (item) => {
    setSelectedItem({
      name: item,
      value:
        item === "telNumber"
          ? contactsInfo[item].replace("+7", "")
          : contactsInfo[item],
    });
    onOpenEditContacts(true);
  };

  if (isLoading) return <Loader />;

  return (
    <Modal
      hideCloseButton
      isOpen={isOpen}
      placement="top-center"
      onOpenChange={onOpenChange}
      className="min-h-screen"
      motionProps={{
        variants: {
          enter: {
            x: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            x: 300,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent className="bg-black">
        {(onClose) => (
          <>
            <ModalHeader className="flex justify-between items-center">
              <div className="w-[81px]">
                <ArrowBackIosIcon onClick={onClose} />
              </div>
              <p className="text-center w-[81px]">Контакты</p>
              <div className="w-[81px]"></div>
            </ModalHeader>
            <ModalBody className="flex mt-5 flex-col items-start">
              <p>Адрес</p>
              <Button
                onClick={() => handleClickSelect("address")}
                className="p-3 bg-[#313131] w-full flex justify-start"
              >
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HomeIcon sx={{ color: "#fff" }} />
                    <p className="text-white">
                      {contactsInfo.address
                        ? contactsInfo.address
                        : "Нажмите для изменения"}
                    </p>
                  </div>
                  <KeyboardArrowRightIcon sx={{ color: "#fff" }} />
                </div>
              </Button>
              <p>Телефон</p>
              <Button
                onClick={() => handleClickSelect("telNumber")}
                className="p-3 bg-[#313131] w-full flex justify-start"
              >
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PhoneIcon sx={{ color: "#fff" }} />
                    <p className="text-white">
                      {contactsInfo.telNumber
                        ? formatPhoneNumber(contactsInfo.telNumber)
                        : "Нажмите для изменения"}
                    </p>
                  </div>
                  <KeyboardArrowRightIcon sx={{ color: "#fff" }} />
                </div>
              </Button>
              <p>
                Instagram{" "}
                <span className="text-xs text-[#5c5c5c]">(*необязтально)</span>
              </p>
              <Button
                onClick={() => handleClickSelect("instagram")}
                className="p-3 bg-[#313131] w-full flex justify-start"
              >
                <div className="w-full flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <img src="/icons/instagram.svg" />
                    <p className=" text-white">
                      {contactsInfo.instagram
                        ? contactsInfo.instagram
                        : "Нажмите для изменения"}
                    </p>
                  </div>
                  <KeyboardArrowRightIcon sx={{ color: "#fff" }} />
                </div>
              </Button>
              <p>
                Vk{" "}
                <span className="text-xs text-[#5c5c5c]">(*необязтально)</span>
              </p>
              <Button
                onClick={() => handleClickSelect("vk")}
                className="p-3 bg-[#313131] w-full flex justify-start"
              >
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src="/icons/vk.svg" />
                    <p className=" text-white">
                      {contactsInfo.vk
                        ? contactsInfo.vk
                        : "Нажмите для изменения"}
                    </p>
                  </div>
                  <KeyboardArrowRightIcon sx={{ color: "#fff" }} />
                </div>
              </Button>
            </ModalBody>
          </>
        )}
      </ModalContent>
      <ModalEditContacts
        isFetching={isFetching}
        refetch={refetch}
        isOpen={isOpenEditContacts}
        onOpenChange={onOpenChangeEditContacts}
        selectedItem={selectedItem}
      />
    </Modal>
  );
};
