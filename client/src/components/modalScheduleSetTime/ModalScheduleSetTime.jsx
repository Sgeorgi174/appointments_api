import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Switch,
} from "@nextui-org/react";
import { SelectsForSetTime } from "../selectsForSetTime/SelectsForSetTime";
import { useState } from "react";

let data = { dates: [], times: [] };

export const ModalScheduleSetTime = ({
  isOpen,
  onOpenChange,
  selectedDays,
  setSchedule,
  setSelectedDays,
}) => {
  const [startTime, setStartTime] = useState(new Set([]));
  const [endTime, setEndTime] = useState(new Set([]));
  const [startRest, setStartRest] = useState(new Set([]));
  const [endRest, setEndRest] = useState(new Set([]));
  const [isRest, setIsRest] = useState(false);
  return (
    <Modal
      isOpen={isOpen}
      placement="bottom-center"
      onOpenChange={onOpenChange}
    >
      <ModalContent className="bg-[#18181b]">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">График</ModalHeader>
            <ModalBody>
              <p>Установите часы работы</p>
              <SelectsForSetTime
                startTime={startTime}
                setStartTime={setStartTime}
                endTime={endTime}
                setEndTime={setEndTime}
              />
              <div className="flex flex-col mt-4 gap-2">
                <Switch
                  color="secondary"
                  isSelected={isRest}
                  classNames={{ label: "text-white" }}
                  onValueChange={setIsRest}
                >
                  Добавить перерыв
                </Switch>
              </div>
              <p className={`mt-4 ${isRest ? "text-white" : "text-[#373737]"}`}>
                Установите время перерыва
              </p>
              <SelectsForSetTime
                disabled={!isRest}
                startTime={startRest}
                setStartTime={setStartRest}
                endTime={endRest}
                setEndTime={setEndRest}
              />
              <div className="flex justify-center mt-6">
                <Button variant="bordered" color="danger">
                  Сделать дни не рабочими
                </Button>
              </div>
            </ModalBody>
            <ModalFooter className="flex justify-between">
              <Button color="primary" variant="light" onPress={onClose}>
                Отменить
              </Button>
              <Button
                color="secondary"
                onPress={() => {
                  data = selectedDays.map((el) => {
                    return {
                      date: el,
                      startTime: startTime.anchorKey,
                      endTime: endTime.anchorKey,
                    };
                  });
                  setSchedule(data);
                  setSelectedDays([]);
                  onClose();
                }}
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
