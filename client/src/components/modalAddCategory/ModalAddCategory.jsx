import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";
import { useAddCategoryMutation } from "../../redux/categoriesApi";

export const ModalAddCategory = ({
  isOpen,
  onOpenChange,
  refetch,
  isFetching,
}) => {
  const [name, setName] = useState("");
  const [addCategory, { isLoading }] = useAddCategoryMutation();

  const handleClickAdd = async () => {
    try {
      await addCategory({ name });
      await refetch();
      setName("");
      onOpenChange(false);
    } catch (error) {
      console.log(error);
    }
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
            <ModalHeader className="flex flex-col gap-1">Каталог</ModalHeader>
            <ModalBody>
              <p>Укажите название категории</p>
              <Input value={name} onValueChange={setName} />
            </ModalBody>
            <ModalFooter className="flex justify-between">
              <Button
                isDisabled={isLoading || isFetching}
                color="primary"
                variant="light"
                onPress={onClose}
              >
                Отменить
              </Button>
              <Button
                isLoading={isLoading || isFetching}
                color="secondary"
                onClick={handleClickAdd}
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
