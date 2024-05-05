import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  useDeleteServiceMutation,
  useEditServiceMutation,
} from "../../redux/servicesApi";

const timeArr = [
  "30 мин",
  "1 ч",
  "1 ч 30 мин",
  "2 ч",
  "2 ч 30 мин",
  "3 ч",
  "3 ч 30 мин",
  "4 ч",
  "4 ч 30 мин",
  "5 ч",
  "5 ч 30 мин",
  "6 ч",
  "6 ч 30 мин",
  "7 ч",
  "7 ч 30 мин",
  "8 ч",
  "8 ч 30 мин",
  "9 ч",
  "9 ч 30 мин",
  "10 ч",
];

const timeArrInMinutes = [
  30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480,
  510, 540, 570, 600,
];

export const ModalCurrentService = ({
  isOpen,
  onOpenChange,
  service,
  refetch,
  isFetching,
}) => {
  const initialState = {
    name: "",
    duration: "",
    cost: "",
    serviceId: service.id,
  };
  const [serviceData, setServiceData] = useState(initialState);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [value, setValue] = useState(new Set([]));
  const [editService, { isLoading: isLoadingEditService }] =
    useEditServiceMutation();
  const [deleteService, { isLoading: isLoadingDeleteService }] =
    useDeleteServiceMutation();

  const convertTimeToString = (time) => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours} ч${minutes === 0 ? "" : ` ${minutes} мин`}`;
  };

  useEffect(() => {
    if (service.duration) {
      console.log(service);
      setValue([convertTimeToString(service.duration)] || new Set([]));
      setServiceData(service || initialState);
    }
  }, [service]);

  useEffect(() => {
    setConfirmDelete(false);
  }, [isOpen]);

  const handleClickConfirm = () => {
    setConfirmDelete(!confirmDelete);
  };

  const handleChangeSelect = (newValue) => {
    setValue(newValue);
    const index = timeArr.indexOf(newValue.anchorKey);
    setServiceData({ ...serviceData, duration: timeArrInMinutes[index] });
  };

  const handleClickEdit = async () => {
    await editService(serviceData);
    await refetch();
    onOpenChange(false);
  };

  const handleClickDelete = async () => {
    await deleteService(serviceData);
    await refetch();
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
              {service.name}
            </ModalHeader>
            <ModalBody>
              <p>Название услуги</p>
              <Input
                value={serviceData.name}
                onValueChange={(newValue) =>
                  setServiceData({ ...serviceData, name: newValue })
                }
              />
              <div className="flex justify-between">
                <div>
                  <p>Стоимость</p>
                  <Input
                    className="w-[120px] mt-3"
                    type="number"
                    endContent={<p className="text-black">руб.</p>}
                    value={serviceData.cost}
                    onValueChange={(newValue) =>
                      setServiceData({ ...serviceData, cost: newValue })
                    }
                  />
                </div>
                <div>
                  <p>Продолжительность</p>
                  <Select
                    selectedKeys={value}
                    className="w-[162px]  mt-3"
                    classNames={{
                      base: "text-black",
                      value: "text-center",
                      listbox: "text-black",
                    }}
                    onSelectionChange={(newValue) =>
                      handleChangeSelect(newValue)
                    }
                    aria-label="выберете время"
                  >
                    {timeArr.map((time) => (
                      <SelectItem aria-label={time} key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </div>

              {!confirmDelete ? (
                <Button
                  onClick={handleClickConfirm}
                  isDisabled={
                    isLoadingEditService || isFetching || isLoadingEditService
                  }
                  color="danger"
                >
                  Удалить выбранную услугу
                </Button>
              ) : (
                <p>Удалить эту услугу?</p>
              )}
            </ModalBody>
            <ModalFooter className="flex justify-center">
              {confirmDelete ? (
                <div className="w-full">
                  <div className="flex justify-between mt-4">
                    <Button
                      isDisabled={isFetching || isLoadingDeleteService}
                      onClick={handleClickConfirm}
                      color="primary"
                    >
                      Нет
                    </Button>
                    <Button
                      onClick={handleClickDelete}
                      isLoading={isFetching || isLoadingDeleteService}
                      color="danger"
                    >
                      Да
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <div className="flex justify-between">
                    <Button color="primary" variant="light" onPress={onClose}>
                      Отменить
                    </Button>
                    <Button
                      isLoading={isFetching || isLoadingEditService}
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
