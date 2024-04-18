const { prisma } = require("../prisma/prisma_client");
const { findAvailablePort } = require("../utils/findAvailablePort");
const { uploadFile } = require("../utils/uploadFile");

const add = async (req, res) => {
  try {
    const { botToken, address, greetingText, notificationText } = req.body;
    const userId = req.user.id;

    // Проверяем обязательные поля
    if (!botToken || !address || !notificationText || !greetingText) {
      return res
        .status(400)
        .json({ message: "Пожалуйста, заполните обязательные поля" });
    }

    // Настройка промисов для выполнения параллельных запросов
    const [port, addressFileUrl, greetingFileUrl, notificationFileUrl] =
      await Promise.all([
        findAvailablePort(),
        uploadFile(req.files["addressFile"], userId),
        uploadFile(req.files["greetingFile"], userId),
        uploadFile(req.files["notificationFile"], userId),
      ]);

    // Создаем запись в базе данных
    const bot = await prisma.userBotSettings.create({
      data: {
        botToken,
        address,
        port,
        greetingText,
        notificationText,
        addressFileUrl,
        greetingFileUrl,
        notificationFileUrl,
        userId,
      },
    });

    // Отправляем ответ с созданным ботом
    return res.status(200).json(bot);
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

const edit = async (req, res) => {
  try {
    const data = req.body;
    const userId = req.user.id;
    const { id } = req.body;

    // Находим запись в базе данных по botId и userId
    let bot = await prisma.userBotSettings.findFirst({
      where: {
        id: parseInt(id),
        userId,
      },
    });

    if (!bot) {
      return res.status(404).json({ message: "Бот не найден" });
    }

    // Обновляем поля записи
    bot = await prisma.userBotSettings.update({
      where: {
        id: parseInt(id),
        userId,
      },
      data: { ...data, id: parseInt(id) },
    });

    // Отправляем ответ с обновленным ботом
    return res.status(200).json(bot);
  } catch (error) {
    console.error("Error editing bot settings:", error);
    return res.status(500).json({ error: "Error editing bot settings" });
  }
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

module.exports = { add, get, edit, getCurrent, addTelegramId };
