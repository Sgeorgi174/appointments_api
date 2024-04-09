const { prisma } = require("../prisma/prisma_client");
const fs = require("fs");

const add = async (req, res) => {
  try {
    // Получаем данные о пользователе и другие поля из тела запроса
    const { botToken, botName, address } = req.body;
    console.log(req.file);

    // Получаем путь к загруженному изображению
    const imgUrl = req.file ? req.file.path : "";

    // Проверяем обязательные поля
    if (!botToken || !botName || !address) {
      return res
        .status(400)
        .json({ message: "Пожалуйста, заполните обязательные поля" });
    }

    // Создаем запись в базе данных
    const bot = await prisma.userBotSettings.create({
      data: {
        botToken,
        botName,
        address,
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
  const { userId } = req.user.id;

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
      imgUrl = req.file.path;

      // Удаляем часть пути '/root/appointments_api'
      imgUrl = imgUrl.replace("/root/appointments_api", "");

      // Удалить старый файл аватара, если он существует
      const oldBotSettings = await prisma.userBotSettings.findUnique({
        where: { id: parseInt(id) },
      });
      if (oldBotSettings.imgUrl) {
        fs.unlinkSync(oldBotSettings.imgUrl);
      }
    }

    // Обновляем настройки бота, включая imgUrl
    const updatedBotSettings = await prisma.userBotSettings.update({
      where: { id: parseInt(id) },
      data: { botToken, botName, address, imgUrl },
    });

    return res.status(200).json(updatedBotSettings);
  } catch (error) {
    console.error("Error updating bot settings:", error);
    return res.status(500).json({ error: "Error updating bot settings" });
  }
};

module.exports = { add, get, edit };
