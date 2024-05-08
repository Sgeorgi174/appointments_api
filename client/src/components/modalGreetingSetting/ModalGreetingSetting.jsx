import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Select,
  SelectItem,
  Image,
  useDisclosure,
} from "@nextui-org/react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { TelegramWindow } from "../telegramWindow/TelegramWindow";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TextsmsIcon from "@mui/icons-material/Textsms";
import ImageIcon from "@mui/icons-material/Image";
import { useEffect, useState } from "react";
import { ModalEditGreetingText } from "../modalEditGreetingText/ModalEditGreetingText";
import { useAddOrEditSettingMutation } from "../../redux/botSettingsApi";

const imagesList = [
  { label: "Без картинки", url: "", id: 1 },
  { label: "Вариант 1", url: "/img/forSettings/type_1.jpeg", id: 2 },
  { label: "Вариант 2", url: "/img/forSettings/type_2.jpeg", id: 3 },
  { label: "Вариант 3", url: "/img/forSettings/type_3.jpeg", id: 4 },
  { label: "Вариант 4", url: "/img/forSettings/type_4.jpeg", id: 5 },
  { label: "Вариант 5", url: "/img/forSettings/type_5.jpeg", id: 6 },
  { label: "Вариант 6", url: "/img/forSettings/type_6.jpeg", id: 7 },
];

export const ModalGreetingSetting = ({
  isOpen,
  onOpenChange,
  refetch,
  isFetching,
  botSettings,
}) => {
  const [editSetting] = useAddOrEditSettingMutation();
  const [greetingText, setGreetingText] = useState("");
  const [value, setValue] = useState(new Set([""]));
  const {
    isOpen: isOpenEditGreetingText,
    onOpen: onOpenEditGreetingText,
    onOpenChange: onOpenChangeEditGreetingText,
  } = useDisclosure();

  useEffect(() => {
    if (botSettings) {
      setGreetingText(botSettings.greetingText);
      setValue(
        botSettings.greetingFileUrl
          ? new Set([botSettings.greetingFileUrl])
          : new Set([""])
      );
    }
  }, [botSettings]);

  const handleChange = async (newValue) => {
    await editSetting({ greetingFileUrl: newValue.anchorKey });
    setValue(newValue);
  };
  console.log();
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
              <p className="text-center">Приветствие</p>
              <div>
                <p>d</p>
              </div>
            </ModalHeader>
            <ModalBody className="flex mt-5 flex-col items-start">
              <div className="w-full flex flex-col items-center">
                <TelegramWindow
                  text={greetingText}
                  command="start"
                  imageLink={Array.from(value)[0]}
                />
                <Button
                  onClick={onOpenEditGreetingText}
                  className="w-full mt-5 rounded-lg bg-[#313131] p-0"
                >
                  <div className="flex w-full justify-between  items-center    p-2">
                    <div className="flex items-center  gap-2">
                      <div className="flex justify-center items-center w-[28px] h-[28px] bg-[#0064ff] rounded">
                        <TextsmsIcon
                          sx={{ color: "#fff", width: 20, height: 20 }}
                        />
                      </div>
                      <p className="text-white">Изменить текст приветствия</p>
                    </div>
                    <ArrowForwardIosIcon
                      sx={{ width: 15, height: 15, color: "#ffff" }}
                    />
                  </div>
                </Button>
                <Select
                  selectedKeys={value}
                  className="w-full  mt-3"
                  startContent={
                    <div className="flex ri justify-center items-center min-w-[28px] h-[28px] bg-[#0064ff] rounded">
                      <ImageIcon
                        sx={{ color: "#fff", width: 20, height: 20 }}
                      />
                    </div>
                  }
                  classNames={{
                    base: "text-white p-0",
                    value: "text-white group-data-[has-value=true]:text-white",
                    listbox: "text-black",
                    trigger: "rounded-lg bg-[#313131] p-2",
                    innerWrapper: "flex w-full text-white gap-2",
                    selectorIcon:
                      "w-5 h-5 rotate-[-90deg] right-2 data-[open=true]:rotate-180",
                  }}
                  onSelectionChange={(newValue) => handleChange(newValue)}
                  aria-label="выберете картинку"
                >
                  {imagesList.map((image) => (
                    <SelectItem
                      startContent={<Image width={30} src={image.url} />}
                      aria-label={image.label}
                      key={image.url}
                      value={image.value}
                    >
                      {image.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
      <ModalEditGreetingText
        refetch={refetch}
        isFetching={isFetching}
        isOpen={isOpenEditGreetingText}
        onOpenChange={onOpenChangeEditGreetingText}
        greetingText={greetingText}
        setGreetingText={setGreetingText}
      />
    </Modal>
  );
};
