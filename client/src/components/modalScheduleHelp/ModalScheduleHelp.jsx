import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";

export const ModalScheduleHelp = ({ isOpen, onOpenChange }) => {
  return (
    <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
      <ModalContent className="bg-[#2c2c2c]">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col items-center gap-1">
              Настройте график
            </ModalHeader>
            <ModalBody className="flex flex-col items-center">
              <div className="w-[80px] h-[80px] flex justify-center rounded-full items-center bg-gradient-to-r from-violet-600 to-indigo-600">
                <EditCalendarIcon
                  color="secondary"
                  sx={{
                    color: "#fff",
                    width: 60,
                    height: 60,
                  }}
                />
              </div>
              <div className="flex w-full mt-5 gap-5 items-center justify-start">
                <div className="h-[30px] w-[30px] bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex justify-center items-center">
                  1
                </div>
                <p className=" text-[14px] w-[280px]">
                  Выберите дни, когда вы будете работать. После выбора нажмите
                  на кнопку &rdquo;
                  <span className="font-bold">Править</span>&rdquo;
                </p>
              </div>
              <img
                className=" rounded-xl"
                src="/img/modale_help_1.jpeg"
                alt=""
              />
              <div className="flex w-full mt-5 gap-5 items-center justify-start">
                <div className="h-[30px] w-[30px] bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex justify-center items-center">
                  2
                </div>
                <p className=" text-[14px] w-[280px]">
                  В открывшемся окне измените время работы. Вы также можете
                  установить выбранные дни, как нерабочие. При необходимости
                  добавьте перерыв.
                </p>
              </div>
              <img
                className=" rounded-xl"
                src="/img/modale_help_2.jpeg"
                alt=""
              />
            </ModalBody>
            <ModalFooter className="flex justify-center">
              <Button color="secondary" onPress={onClose}>
                Понятно
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
