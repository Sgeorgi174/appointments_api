const { prisma } = require("../prisma/prisma_client");

const getBotSettingByUserId = async (userId) => {
  const botSetting = await prisma.userBotSettings.findFirst({
    where: { userId: parseInt(userId) },
  });

  if (!botSetting) {
    throw new Error("Настройки не найдены");
  }

  return botSetting;
};

module.exports = { getBotSettingByUserId };
