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
import { useState } from "react";
import { useAddServiceMutation } from "../../redux/servicesApi";

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

export const ModalAddService = ({
  isOpen,
  onOpenChange,
  category,
  refetch,
  isFetching,
}) => {
  const initialState = {
    name: "",
    duration: "",
    cost: "",
    categoryId: category.id,
  };

  const [value, setValue] = useState(new Set([]));
  const [addService, { isLoading }] = useAddServiceMutation();
  const [serviceData, setServiceData] = useState(initialState);

  const handleChangeSelect = (newValue) => {
    setValue(newValue);
    const index = timeArr.indexOf(newValue.anchorKey);
    setServiceData({ ...serviceData, duration: timeArrInMinutes[index] });
  };

  const handleAddClick = async () => {
    await addService(serviceData);
    await refetch();
    setServiceData(initialState);
    onOpenChange(false);
  };

  return (
    <Modal
      backdrop="blur"
      isDismissable={false}
      placement="top-center"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent className="bg-[#18181b]">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Добавить услугу
            </ModalHeader>
            <ModalBody>
              <p>Укажите название услуги</p>
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
            </ModalBody>
            <ModalFooter className="flex justify-between">
              <Button
                isDisabled={isFetching || isLoading}
                color="primary"
                variant="light"
                onPress={onClose}
              >
                Отменить
              </Button>
              <Button
                onClick={handleAddClick}
                color="secondary"
                isLoading={isFetching || isLoading}
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
