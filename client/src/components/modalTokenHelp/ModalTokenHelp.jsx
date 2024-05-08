import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

export const ModalTokenHelp = ({ isOpen, onOpenChange }) => {
  return (
    <Modal
      hideCloseButton
      isOpen={isOpen}
      isDismissable={false}
      placement="top-center"
      onOpenChange={onOpenChange}
    >
      <ModalContent className="bg-[#2c2c2c]">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col items-center gap-1">
              Получение токена
            </ModalHeader>
            <ModalBody className="flex flex-col items-center">
              <div className="flex w-full mt-5 gap-5 items-center justify-start">
                <div className="h-[30px] w-[30px] bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex justify-center items-center">
                  1
                </div>
                <p className=" text-[14px] w-[280px]">
                  Откройте Telegram и найдите бота{" "}
                  <span className="font-bold">@BotFather</span>.
                </p>
              </div>
              <img
                className=" rounded-xl"
                src="/img/instruction/step_1.jpg"
                alt=""
              />
              <div className="flex w-full mt-5 gap-5 items-center justify-start">
                <div className="h-[30px] w-[30px] bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex justify-center items-center">
                  2
                </div>
                <p className=" text-[14px] w-[280px]">
                  Напишите ему <span className="font-bold">/newbot</span> и
                  следуйте инструкциям для создания нового бота.
                </p>
              </div>
              <img
                className=" rounded-xl"
                src="/img/instruction/step_2.jpg"
                alt=""
              />
              <div className="flex w-full mt-5 gap-5 items-center justify-start">
                <div className="h-[30px] w-[30px] bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex justify-center items-center">
                  3
                </div>
                <p className=" text-[14px] w-[280px]">
                  <span className="font-bold">@BotFather</span> предложит вам
                  ввести <span className="font-bold">имя</span> вашего бота (это{" "}
                  <span className="font-bold">имя</span> будет отображаться в
                  списке контактов).
                </p>
              </div>
              <img
                className=" rounded-xl"
                src="/img/instruction/step_3.jpg"
                alt=""
              />
              <div className="flex w-full mt-5 gap-5 items-center justify-start">
                <div className="h-[30px] w-[30px] bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex justify-center items-center">
                  4
                </div>
                <p className=" text-[14px] w-[280px]">
                  <span className="font-bold">@BotFather</span> предложит вам
                  ввести уникальную <span className="font-bold">ссылку</span>{" "}
                  для вашего бота, которая должна заканчиваться на{" "}
                  <span className="font-bold">&rdquo;bot&rdquo;</span> (пример:{" "}
                  <span className="font-bold">&rdquo;example_bot&rdquo;</span>)
                </p>
              </div>
              <img
                className=" rounded-xl"
                src="/img/instruction/step_4.jpg"
                alt=""
              />
              <div className="flex w-full mt-5 gap-5 items-center justify-start">
                <div className="h-[30px] w-[30px] bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex justify-center items-center">
                  5
                </div>
                <p className=" text-[14px] w-[280px]">
                  После успешного создания бота{" "}
                  <span className="font-bold">@BotFather</span> выдаст вам{" "}
                  <span className="font-bold">token</span>. Это — ключ, который
                  вы будете использовать для создания вашего бота.
                </p>
              </div>
              <img
                className=" rounded-xl"
                src="/img/instruction/step_5.jpg"
                alt=""
              />
              <div className="flex w-full mt-5 gap-5 items-center justify-start">
                <div className="h-[30px] w-[30px] bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex justify-center items-center">
                  6
                </div>
                <p className=" text-[14px] w-[280px]">
                  Сохраните <span className="font-bold">токен</span>, полученный
                  от <span className="font-bold">@BotFather</span>. Он будет
                  необходим для создания бота.
                </p>
              </div>
            </ModalBody>
            <ModalFooter className="flex flex-col justify-center">
              <p className="mt-5 text-center">
                {" "}
                После выполнения этих шагов вы готовы к созданию вашего бота. Не
                забудьте хранить ваш токен в безопасном месте и не делиться им с
                посторонними.
              </p>
              <Button className="mt-4" color="secondary" onPress={onClose}>
                Понятно
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
