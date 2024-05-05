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
import { ModalAddService } from "../modalAddService/modalAddService";
import { ModalCurrentService } from "../modalCurrentService/ModalCurrentService";
import { useState } from "react";

export const ModalSelectedCategory = ({
  isOpen,
  onOpenChange,
  category,
  refetch,
  isFetching,
}) => {
  const {
    isOpen: isOpenAddService,
    onOpen: onOpenAddService,
    onOpenChange: onOpenChangeAddService,
  } = useDisclosure();

  const {
    isOpen: isOpenSelectedService,
    onOpen: onOpenSelectedService,
    onOpenChange: onOpenChangeSelectedService,
  } = useDisclosure();

  const [selectedService, setSelectedService] = useState({});

  const handleClickSelectService = (service) => {
    setSelectedService(service);
    onOpenSelectedService(true);
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
              <p className="text-center">{category.name}</p>
              <Button
                size="sm"
                className=" rounded-full p-0 min-w-8"
                color="secondary"
                onClick={onOpenAddService}
              >
                <AddIcon />
              </Button>
            </ModalHeader>
            <ModalBody className="flex mt-5 flex-col items-start">
              <p className=" mt-3">Услуги</p>
              <div className="flex flex-col w-full gap-2">
                {category.services.map((service) => {
                  return (
                    <Button
                      onClick={() => handleClickSelectService(service)}
                      key={service.id}
                      className=" bg-[#313131] w-full p-0 rounded-lg"
                    >
                      <div className="flex w-full justify-between  items-center p-3">
                        <div className="flex  items-center gap-2">
                          <p className="text-white">{service.name}</p>
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
      <ModalAddService
        isFetching={isFetching}
        refetch={refetch}
        category={category}
        isOpen={isOpenAddService}
        onOpenChange={onOpenChangeAddService}
      />
      <ModalCurrentService
        isFetching={isFetching}
        refetch={refetch}
        isOpen={isOpenSelectedService}
        onOpenChange={onOpenChangeSelectedService}
        service={selectedService}
      />
    </Modal>
  );
};
