const { prisma } = require("../prisma/prisma_client");

const add = async (req, res) => {
  const { botToken, botName, address } = req.body;

  if (!botToken || !botName || !address) {
    return res
      .status(400)
      .json({ message: "Пожалуйста, заполните обязательные поля" });
  }

  const bot = await prisma.userBotSettings.create({
    data: {
      botToken,
      botName,
      address,
      userId: req.user.id,
    },
  });

  return res.status(200).json(bot);
};

const get = async (req, res) => {
  const { userId } = req.params;

  const botSettings = await prisma.userBotSettings.findFirst({
    where: {
      userId,
    },
  });

  if (!botSettings) {
    return res.status(400).json({ message: "Настройки не найдены" });
  }

  return res.status(200).json(botSettings);
};

module.exports = { add, get };
