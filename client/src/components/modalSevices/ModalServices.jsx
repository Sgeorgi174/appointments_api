import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FolderIcon from "@mui/icons-material/Folder";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ModalServicesCategory } from "../modalServicesCategory/ModalServicesCategory";
import { useGetCategoriesQuery } from "../../redux/categoriesApi";
import { useEffect, useState } from "react";

export const ModalServices = ({ isOpen, onOpenChange }) => {
  const {
    isOpen: isOpenCategory,
    onOpen: onOpenCategory,
    onOpenChange: onOpenChangeCategory,
  } = useDisclosure();
  const { data: categoriesData } = useGetCategoriesQuery();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [categoriesData]);

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
              <p className="text-center w-[81px]">Услуги</p>
              <div className="w-[81px]"></div>
            </ModalHeader>
            <ModalBody className="flex mt-5 flex-col items-start">
              <p>Категории услуг</p>
              <Button
                onClick={onOpenCategory}
                className=" bg-[#313131] w-full p-0 rounded-lg"
              >
                <div className="flex w-full justify-between  items-center p-3">
                  <div className="flex  items-center gap-2">
                    <div className="flex justify-center items-center w-[28px] h-[28px] bg-[#0064ff] rounded">
                      <FolderIcon
                        sx={{ color: "#fff", width: 20, height: 20 }}
                      />
                    </div>
                    <p className="text-white">Категории услуг</p>
                  </div>
                  <div className=" flex items-center gap-2">
                    <p className="text-[#939393]">{categories.length}</p>
                    <ArrowForwardIosIcon
                      sx={{ width: 15, height: 15, color: "#ffff" }}
                    />
                  </div>
                </div>
              </Button>

              <p className=" mt-3">Список категорий</p>
              <div className="flex flex-col w-full gap-2">
                {categories.map((el, index) => {
                  return (
                    <Button
                      key={`${el.name}-${index}`}
                      className=" bg-[#313131] w-full p-0 rounded-lg"
                    >
                      <div className="flex w-full justify-between  items-center p-3">
                        <div className="flex  items-center gap-2">
                          <p className="text-white">{el.name}</p>
                        </div>
                        <div className=" flex items-center gap-2">
                          <p className="text-[#939393]">{el.services.length}</p>
                          <ArrowForwardIosIcon
                            sx={{ width: 15, height: 15, color: "#ffff" }}
                          />
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
      <ModalServicesCategory
        setCategories={setCategories}
        categories={categories}
        isOpen={isOpenCategory}
        onOpenChange={onOpenChangeCategory}
      />
    </Modal>
  );
};
