import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import {
  useDeleteCategoryMutation,
  useEditCategoryMutation,
} from "../../redux/categoriesApi";

export const ModalCurrentCategory = ({
  isOpen,
  onOpenChange,
  category,
  refetch,
  isFetching,
}) => {
  const [name, setName] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editCategory, { isLoading: isLoadingEditCategory }] =
    useEditCategoryMutation();
  const [deleteCategory, { isLoading: isLoadingDeleteCategory }] =
    useDeleteCategoryMutation();

  useEffect(() => {
    setName(category.name || "");
  }, [category.name]);

  useEffect(() => {
    setConfirmDelete(false);
  }, [isOpen]);

  const handleClickEdit = useCallback(async () => {
    try {
      await editCategory({
        id: category.id,
        name: name,
      });
      await refetch();
      onOpenChange(false);
    } catch (error) {
      console.log(error);
    }
  }, [editCategory, category.id, name, onOpenChange, refetch]);

  const handleClickConfirm = () => {
    setConfirmDelete(!confirmDelete);
  };

  const handleClickDelete = useCallback(async () => {
    try {
      await deleteCategory({
        id: category.id,
      });
      await refetch();
      onOpenChange(false);
    } catch (error) {
      console.log(error);
    }
  }, [deleteCategory, category.id, onOpenChange, refetch]);

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
              {category.name}
            </ModalHeader>
            <ModalBody>
              <p>Укажите новое название категории</p>
              <Input value={name} onValueChange={setName} />

              {!confirmDelete ? (
                <Button
                  onClick={handleClickConfirm}
                  isDisabled={isFetching || isLoadingEditCategory}
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
                      isDisabled={isFetching || isLoadingDeleteCategory}
                      onClick={handleClickConfirm}
                      color="primary"
                    >
                      Нет
                    </Button>
                    <Button
                      isLoading={isFetching || isLoadingDeleteCategory}
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
                        isLoadingEditCategory || isLoadingDeleteCategory
                      }
                      color="primary"
                      variant="light"
                      onPress={onClose}
                    >
                      Отменить
                    </Button>
                    <Button
                      isDisabled={isLoadingDeleteCategory}
                      isLoading={isFetching || isLoadingEditCategory}
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
