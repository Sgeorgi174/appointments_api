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
import {
  useDeleteCategoryMutation,
  useEditCategoryMutation,
} from "../../redux/categoriesApi";

export const ModalCurrentCategory = ({
  isOpen,
  onOpenChange,
  category,
  setCategories,
}) => {
  const [name, setName] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editCategory, { isLoading: isLoadingEditCatgory }] =
    useEditCategoryMutation();
  const [deleteCategory, { isLoading: isLoadingDeleteCatgory }] =
    useDeleteCategoryMutation();

  useEffect(() => {
    setName(category.name);
  }, [category.name]);

  useEffect(() => {
    setConfirmDelete(false);
  }, [isOpen]);

  const handleClickEdit = async () => {
    try {
      const categories = await editCategory({
        id: category.id,
        name: name,
      }).unwrap();
      setCategories(categories);
      onOpenChange(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickConfirm = () => {
    setConfirmDelete(!confirmDelete);
  };

  const handleClickDelete = async () => {
    try {
      console.log(category.id);
      const categories = await deleteCategory({
        id: category.id,
      }).unwrap();
      setCategories(categories);
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
            <ModalHeader className="flex flex-col gap-1">
              {category.name}
            </ModalHeader>
            <ModalBody>
              <p>Укажите новое название категории</p>
              <Input value={name} onValueChange={setName} />

              {!confirmDelete ? (
                <Button
                  onClick={handleClickConfirm}
                  isDisabled={isLoadingEditCatgory}
                  color="danger"
                >
                  Удалить выбранную категорию
                </Button>
              ) : (
                <p>Удалить эту категорию?</p>
              )}
            </ModalBody>
            <ModalFooter className="flex justify-center">
              {confirmDelete ? (
                <div className="w-full">
                  <div className="flex justify-between mt-4">
                    <Button
                      isDisabled={isLoadingDeleteCatgory}
                      onClick={handleClickConfirm}
                      color="primary"
                    >
                      Нет
                    </Button>
                    <Button
                      isLoading={isLoadingDeleteCatgory}
                      onClick={handleClickDelete}
                      color="danger"
                    >
                      Да
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <div className="flex justify-between">
                    <Button
                      isDisabled={
                        isLoadingEditCatgory || isLoadingDeleteCatgory
                      }
                      color="primary"
                      variant="light"
                      onPress={onClose}
                    >
                      Отменить
                    </Button>
                    <Button
                      isDisabled={isLoadingDeleteCatgory}
                      isLoading={isLoadingEditCatgory}
                      color="secondary"
                      onClick={handleClickEdit}
                    >
                      Сохранить
                    </Button>
                  </div>
                </div>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
