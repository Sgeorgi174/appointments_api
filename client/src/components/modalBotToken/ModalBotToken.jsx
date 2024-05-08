import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { ModalEditToken } from "../modalEditToken/ModalEditToken";
import { ModalTokenHelp } from "../modalTokenHelp/ModalTokenHelp";

export const ModalBotToken = ({
  isOpen,
  onOpenChange,
  botSettings,
  refetch,
  isFetching,
}) => {
  const {
    isOpen: isOpenEditBotToken,
    onOpen: onOpenEditBotToken,
    onOpenChange: onOpenChangeEditBotToken,
  } = useDisclosure();

  const {
    isOpen: isOpenHelp,
    onOpen: onOpenHelp,
    onOpenChange: onOpenChangeHelp,
  } = useDisclosure();

  const handleClickEdit = () => {
    onOpenEditBotToken(true);
  };
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
              <ArrowBackIosIcon onClick={onClose} />
              <p className="text-center w-[81px]">Token</p>
              <HelpOutlineIcon onClick={onOpenHelp} />
            </ModalHeader>
            <ModalBody className="flex mt-5 flex-col items-start">
              <Button
                onClick={handleClickEdit}
                className="p-3 bg-[#313131] w-full flex justify-start"
              >
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SmartToyIcon sx={{ color: "#fff" }} />
                    <p className="text-white">
                      {botSettings.botToken
                        ? botSettings.botToken.length > 25
                          ? botSettings.botToken.slice(0, 25) + "..."
                          : botSettings.botToken
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
      <ModalEditToken
        isFetching={isFetching}
        refetch={refetch}
        botSettings={botSettings}
        isOpen={isOpenEditBotToken}
        onOpenChange={onOpenChangeEditBotToken}
      />
      <ModalTokenHelp isOpen={isOpenHelp} onOpenChange={onOpenChangeHelp} />
    </Modal>
  );
};
