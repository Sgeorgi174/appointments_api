import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddIcon from "@mui/icons-material/Add";
import { ModalAddCategory } from "../modalAddCategory/ModalAddCategory";
import { ModalCurrentCategory } from "../modalCurrentCategory/ModalCurrentCategory";
import { useState } from "react";

export const ModalServicesCategory = ({
  isOpen,
  onOpenChange,
  categories,
  setCategories,
}) => {
  const [selectCategory, setSelectCategory] = useState({});

  const {
    isOpen: isOpenAddCategory,
    onOpen: onOpenAddCategory,
    onOpenChange: onOpenChangeAddCategory,
  } = useDisclosure();

  const {
    isOpen: isOpenCurrentCategory,
    onOpen: onOpenCurrentCategory,
    onOpenChange: onOpenChangeCurrentCategory,
  } = useDisclosure();

  const handleClickEdit = (category) => {
    setSelectCategory(category);
    onOpenCurrentCategory(true);
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
              <div>
                <ArrowBackIosIcon onClick={onClose} />
              </div>
              <p className="text-center">Категории</p>
              <Button
                size="sm"
                className=" rounded-full p-0 min-w-8"
                color="secondary"
                onClick={onOpenAddCategory}
              >
                <AddIcon />
              </Button>
            </ModalHeader>
            <ModalBody className="flex mt-5 flex-col items-start">
              <p className=" mt-3">Категории</p>
              <div className="flex flex-col w-full gap-2">
                {categories.map((el, index) => {
                  return (
                    <Button
                      key={`${el.name}-${index}`}
                      className=" bg-[#313131] w-full p-0 rounded-lg"
                      onClick={() => handleClickEdit(el)}
                    >
                      <div className="flex w-full justify-between  items-center p-3">
                        <div className="flex  items-center gap-2">
                          <p className="text-white">{el.name}</p>
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
      <ModalAddCategory
        setCategories={setCategories}
        isOpen={isOpenAddCategory}
        onOpenChange={onOpenChangeAddCategory}
      />
      <ModalCurrentCategory
        setCategories={setCategories}
        isOpen={isOpenCurrentCategory}
        onOpenChange={onOpenChangeCurrentCategory}
        category={selectCategory}
      />
    </Modal>
  );
};
