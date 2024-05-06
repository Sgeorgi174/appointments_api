import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Input,
} from "@nextui-org/react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";

export const ModalProfile = ({ isOpen, onOpenChange }) => {
  const [isEdit, setIsEdit] = useState();
  const [inputEmail, setInputEmail] = useState();
  const [firstName, setFirstName] = useState();
  const { email, name } = useSelector(selectAuth);

  useEffect(() => {
    if (email && name) {
      setInputEmail(email);
      setFirstName(name);
    }
  }, [name, email]);

  const handleClickEdit = () => {
    if (isEdit) {
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
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
              <div className="w-[81px]">
                <ArrowBackIosIcon onClick={onClose} />
              </div>
              <p className="text-center w-[81px]">Профиль</p>
              <Button
                onClick={handleClickEdit}
                color="secondary"
                className="w-[81px]"
                size="sm"
              >
                {!isEdit ? "Изменить" : "Сохранить"}
              </Button>
            </ModalHeader>
            <ModalBody className="flex mt-[100px] flex-col items-center">
              <Input
                readOnly={!isEdit}
                label="Email"
                placeholder="Введите ваш email"
                value={inputEmail}
                onValueChange={setInputEmail}
                labelPlacement="outside"
                className={`${!isEdit ? "pointer-events-none" : ""}`}
                classNames={{
                  label:
                    "text-black group-data-[filled-within=true]:text-white",
                  inputWrapper: `${
                    !isEdit ? "bg-[#4d4d4d]" : "bg-[#000]"
                  }  group-data-[focus=true]:bg-[#000]`,
                  input: "group-data-[has-value=true]:text-white",
                }}
              />
              <Input
                readOnly={!isEdit}
                label="Имя"
                placeholder="Введите ваше имя"
                value={firstName}
                onValueChange={setFirstName}
                labelPlacement="outside"
                className={`${!isEdit ? "pointer-events-none" : ""}`}
                classNames={{
                  label:
                    "text-black group-data-[filled-within=true]:text-white",
                  inputWrapper: `${
                    !isEdit ? "bg-[#4d4d4d]" : "bg-[#000]"
                  }  group-data-[focus=true]:bg-[#000]`,
                  input: "group-data-[has-value=true]:text-white",
                }}
              />
              <div className="mt-10">В РАЗРАБОТКЕ!</div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
