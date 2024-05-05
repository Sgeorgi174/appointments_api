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
import { timeToMinutes } from "../../utils/timeToMinutes";
import {
  useAddDaysMutation,
  useDeleteDaysMutation,
} from "../../redux/scheduleApi";

let data = { dates: [], times: [] };

export const ModalScheduleSetTime = ({
  isOpen,
  onOpenChange,
  selectedDays,
  setSelectedDays,
  refetch,
  isFetching,
}) => {
  const [startTime, setStartTime] = useState(new Set(["10:00"]));
  const [endTime, setEndTime] = useState(new Set(["20:00"]));
  const [startRest, setStartRest] = useState(new Set(["13:00"]));
  const [endRest, setEndRest] = useState(new Set(["14:00"]));
  const [isRest, setIsRest] = useState(false);
  const [addDays, { isLoading: isAddLoading }] = useAddDaysMutation();
  const [deleteDays, { isLoading: isDeleteLoading }] = useDeleteDaysMutation();
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
                <Button
                  onPress={async () => {
                    await deleteDays(selectedDays);
                    await refetch();
                    setIsRest(false);
                    setSelectedDays([]);
                    onClose();
                  }}
                  variant="bordered"
                  color="danger"
                  isLoading={isDeleteLoading || isFetching}
                >
                  Сделать дни не рабочими
                </Button>
              </div>
            </ModalBody>
            <ModalFooter className="flex justify-between">
              <Button
                isDisabled={isAddLoading || isDeleteLoading || isFetching}
                color="primary"
                variant="light"
                onPress={onClose}
              >
                Отменить
              </Button>
              <Button
                isDisabled={isDeleteLoading}
                isLoading={isAddLoading || isFetching}
                color="secondary"
                onPress={async () => {
                  data = selectedDays.map((day) => {
                    return {
                      date: day,
                      startTime: timeToMinutes(startTime),
                      endTime: timeToMinutes(endTime),
                      startRest: isRest ? timeToMinutes(startRest) : null,
                      endRest: isRest ? timeToMinutes(endRest) : null,
                    };
                  });
                  await addDays(data);
                  await refetch();
                  setIsRest(false);
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
