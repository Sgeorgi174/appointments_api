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
import { convertTimeToString } from "../../utils/convertTimeToString";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import CurrencyRubleIcon from "@mui/icons-material/CurrencyRuble";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

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
                      className=" bg-[#313131] w-full p-3 h-[65px] rounded-lg"
                    >
                      <div className="flex flex-col w-full items-start">
                        <div className="flex items-center">
                          <div className="flex gap-1 items-center">
                            <Grid3x3Icon
                              sx={{ color: "#fff", width: 20, height: 20 }}
                            />
                            <p className="text-white">{service.name}</p>
                          </div>
                        </div>
                        <div className="flex gap-5 mt-2 ml-7">
                          <div className="flex gap-2 items-center">
                            <div className="w-[17px] h-[17px] rounded-full bg-white flex justify-center items-center">
                              <CurrencyRubleIcon
                                sx={{
                                  color: "#000",
                                  width: 12,
                                  height: 12,
                                }}
                              />
                            </div>
                            <p className="text-[#9d9d9d]">
                              {service.cost.toLocaleString("ru-RU")} руб.
                            </p>
                          </div>
                          <div className="flex gap-2 items-center">
                            <AccessTimeFilledIcon
                              sx={{ color: "#fff", width: 20, height: 20 }}
                            />
                            <p className="text-[#9d9d9d]">
                              {convertTimeToString(service.duration)}
                            </p>
                          </div>
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
