const { prisma } = require("../prisma/prisma_client");
const { findAvailablePort } = require("../utils/findAvailablePort");

const addOrEditBotSettings = async (req, res) => {
  try {
    const data = req.body;
    const userId = req.user.id;

    // Проверяем обязательные поля
    if (!data) {
      return res
        .status(400)
        .json({ message: "Пожалуйста, заполните обязательные поля" });
    }

    const port = await findAvailablePort();

    if (!port) {
      return res.status(400).json({ message: "Нет свободных портов" });
    }

    // Создаем запись в базе данных
    const botSetting = await prisma.userBotSettings.upsert({
      where: {
        userId,
      },
      create: {
        ...data,
        port: port,
        userId,
      },
      update: {
        ...data,
        userId,
      },
    });

    // Отправляем ответ с созданным ботом
    return res.status(200).json(botSetting);
  } catch (error) {
    console.error("Error adding bot settings:", error);
    return res.status(500).json({ error: "Error adding bot settings" });
  }
};

const get = async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res.status(400).json({ messgae: "не авторизован" });
  }

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

const getCurrent = async (req, res) => {
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

const addTelegramId = async (req, res) => {
  const { telegramId, id } = req.body;

  if (!id || !telegramId) {
    throw new Error("Не переданы обязательные поля");
  }

  const bot = await prisma.userBotSettings.findUnique({
    where: { id: parseInt(id) },
  });

  if (!bot) {
    throw new Error("Не найден бот");
  }

  await prisma.userBotSettings.update({
    where: { id: parseInt(id) },
    data: {
      telegramId: parseInt(telegramId),
    },
  });

  return res.status(200).json({ message: "ok" });
};

module.exports = { addOrEditBotSettings, get, getCurrent, addTelegramId };
