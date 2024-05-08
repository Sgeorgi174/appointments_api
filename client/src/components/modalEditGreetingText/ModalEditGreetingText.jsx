import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { useAddOrEditSettingMutation } from "../../redux/botSettingsApi";

export const ModalEditGreetingText = ({
  isOpen,
  onOpenChange,
  greetingText,
  setGreetingText,
  refetch,
  isFetching,
}) => {
  const [editSetting, { isLoading }] = useAddOrEditSettingMutation();

  const handleEditSettings = async () => {
    await editSetting({ greetingText: greetingText });
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
              Текст приветствия
            </ModalHeader>
            <ModalBody>
              <p>Измените текст приветствия</p>
              <Textarea
                minRows={2}
                maxRows={11}
                value={greetingText}
                onValueChange={setGreetingText}
              />
            </ModalBody>
            <ModalFooter className="flex justify-between">
              <Button
                isDisabled={isLoading || isFetching}
                color="primary"
                variant="light"
                onPress={onClose}
              >
                Отменить
              </Button>
              <Button
                isLoading={isLoading || isFetching}
                color="secondary"
                onClick={handleEditSettings}
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
