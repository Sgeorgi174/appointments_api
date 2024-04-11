const { prisma } = require("../prisma/prisma_client");
const path = require("path");
const fs = require("fs");
const { findAvailablePort } = require("../utils/findAvailablePort");

const add = async (req, res) => {
  try {
    // Получаем данные о пользователе и другие поля из тела запроса
    const { botToken, botName, address } = req.body;

    // Получаем путь к загруженному изображению
    let imgUrl = req.file ? req.file.path : "";

    // Если загружено изображение, обрабатываем путь
    if (req.file) {
      console.log(imgUrl);
      // Удаляем часть пути '/root/appointments_api'
      // imgUrl = imgUrl.replace("/root/appointments_api", "");
      imgUrl = imgUrl.replace(
        "C:\\Users\\prots\\Desktop\\my-project\\Appointments_API",
        ""
      );
      console.log(imgUrl);
    }

    // Проверяем обязательные поля
    if (!botToken || !botName || !address) {
      return res
        .status(400)
        .json({ message: "Пожалуйста, заполните обязательные поля" });
    }

    const port = await findAvailablePort();

    console.log(port);

    // Создаем запись в базе данных
    const bot = await prisma.userBotSettings.create({
      data: {
        botToken,
        botName,
        address,
        port,
        imgUrl,
        userId: req.user.id,
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
  console.log(userId);

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

const edit = async (req, res) => {
  try {
    const { botToken, botName, address, id } = req.body;
    let imgUrl = "";

    if (req.file) {
      // Если загружен новый файл аватара, обновляем imgUrl
      const rootDir = "C:\\Users\\prots\\Desktop\\my-project\\Appointments_API"; // Замените на корневую директорию вашего проекта
      imgUrl = req.file.path.replace(rootDir, "");

      // Получаем путь к существующему файлу из базы данных
      const existingBotSettings = await prisma.userBotSettings.findUnique({
        where: { id: parseInt(id) },
      });

      if (existingBotSettings && existingBotSettings.imgUrl) {
        // Удаляем существующий файл перед записью нового
        fs.unlinkSync(path.join(rootDir, existingBotSettings.imgUrl));
      }
    }

    // Обновляем настройки бота, включая imgUrl
    const updatedBotSettings = await prisma.userBotSettings.update({
      where: { id: parseInt(id) },
      data: {
        botToken,
        botName,
        address,
        imgUrl: imgUrl,
      },
    });

    return res.status(200).json(updatedBotSettings);
  } catch (error) {
    console.error("Error updating bot settings:", error);
    return res.status(500).json({ error: "Error updating bot settings" });
  }
};

module.exports = { add, get, edit };
