export const createFormDateForSetting = (botSettings) => {
  const formDate = new FormData();
  formDate.append("botToken", botSettings.botToken.replace(/\s/g, ""));
  formDate.append("address", botSettings.address);
  formDate.append("greetingText", botSettings.greetingText);
  formDate.append("notificationText", botSettings.notificationText);

  botSettings.id ? formDate.append("id", botSettings.id) : "";
  botSettings.greetingFile
    ? formDate.append("greetingFile", botSettings.greetingFile.file)
    : "";
  botSettings.addressFile
    ? formDate.append("addressFile", botSettings.addressFile.file)
    : "";
  botSettings.notificationFile
    ? formDate.append("notificationFile", botSettings.notificationFile.file)
    : "";

  return formDate;
};
