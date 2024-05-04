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

export const ModalAddCategory = ({ isOpen, onOpenChange, setCategories }) => {
  const [name, setName] = useState("");
  const [addCategory, { isLoading }] = useAddCategoryMutation();

  const handleClickAdd = async () => {
    try {
      const categories = await addCategory({ name }).unwrap();
      console.log(categories);
      setCategories(categories);
      setName("");
      onOpenChange(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      placement="bottom-center"
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
                isDisabled={isLoading}
                color="primary"
                variant="light"
                onPress={onClose}
              >
                Отменить
              </Button>
              <Button
                isLoading={isLoading}
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
