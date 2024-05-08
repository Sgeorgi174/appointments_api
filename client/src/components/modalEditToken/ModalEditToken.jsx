import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useAddOrEditSettingMutation } from "../../redux/botSettingsApi";
import { useCheckTokenMutation } from "../../redux/botTokenApi";

export const ModalEditToken = ({
  isOpen,
  onOpenChange,
  botSettings,
  refetch,
  isFetching,
}) => {
  const [botToken, setBotToken] = useState("");
  const [addOrEditSeiing, { isLoading: isLoadingEditSetting }] =
    useAddOrEditSettingMutation();
  const [
    checkToken,
    { isLoading: isLoadingCheckToken, isError: isErrorCheckToken },
  ] = useCheckTokenMutation();

  useEffect(() => {
    if (botSettings.botToken) {
      setBotToken(botSettings.botToken);
    }
  }, [botSettings]);

  const handleEditClick = async () => {
    try {
      await checkToken(botToken.replace(/\s/g, "")).unwrap();
      await addOrEditSeiing({ botToken: botToken.replace(/\s/g, "") });
      await refetch();
      onOpenChange(false);
    } catch (error) {
      console.log(error);
      return;
    }
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
            <ModalHeader className="flex flex-col gap-1">Token </ModalHeader>
            <ModalBody>
              <Textarea
                minRows={2}
                value={botToken}
                onValueChange={setBotToken}
                classNames={{ input: "text-base" }}
              />
              <div>
                {isErrorCheckToken && (
                  <p className="text-red-500">Неверный формат токена</p>
                )}
              </div>
            </ModalBody>
            <ModalFooter className="flex justify-between">
              <Button
                isDisabled={
                  isFetching || isLoadingEditSetting || isLoadingCheckToken
                }
                color="primary"
                variant="light"
                onPress={onClose}
              >
                Отменить
              </Button>
              <Button
                isLoading={
                  isFetching || isLoadingEditSetting || isLoadingCheckToken
                }
                onClick={handleEditClick}
                color="secondary"
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
