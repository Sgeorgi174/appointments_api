import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useAddContactMutation } from "../../redux/contactsInfoApi";

const titles = {
  address: "Адрес",
  telNumber: "Номер телефона",
  instagram: "Ваш Instagram",
  vk: "Ваш VK",
};

export const ModalEditContacts = ({
  isOpen,
  onOpenChange,
  selectedItem,
  isFetching,
  refetch,
}) => {
  const [item, setItem] = useState({ name: "", value: "" });
  const [addContact, { isLoading }] = useAddContactMutation();

  useEffect(() => {
    if (selectedItem.name) {
      setItem(selectedItem);
    }
  }, [selectedItem]);

  const handleClickEdit = async () => {
    await addContact({
      [item.name]: item.name === "telNumber" ? "+7" + item.value : item.value,
    });
    await refetch();
    setItem({ name: "", value: "" });
    onOpenChange(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      backdrop="blur"
      isDismissable={false}
      placement="top-center"
      onOpenChange={onOpenChange}
    >
      <ModalContent className="bg-[#18181b]">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {titles[selectedItem.name]}
            </ModalHeader>
            <ModalBody>
              <Input
                maxLength={selectedItem.name === "telNumber" ? 10 : ""}
                classNames={{ input: "text-base" }}
                startContent={
                  selectedItem.name === "telNumber" ? (
                    <p className="text-black">+7</p>
                  ) : (
                    ""
                  )
                }
                value={item.value}
                onValueChange={(newValue) =>
                  setItem({ ...item, value: newValue })
                }
              />
            </ModalBody>
            <ModalFooter className="flex justify-between">
              <Button
                isDisabled={isFetching || isLoading}
                color="primary"
                variant="light"
                onPress={() => {
                  setItem({ name: "", value: "" });
                  onClose();
                }}
              >
                Отменить
              </Button>
              <Button
                onClick={handleClickEdit}
                isLoading={isFetching || isLoading}
                color="secondary"
              >
                Сохранить
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
