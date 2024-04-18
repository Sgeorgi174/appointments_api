const { prisma } = require("../prisma/prisma_client");

const addClient = async (req, res) => {
  const { name, telegramId, telNumber, userId } = req.body;

  try {
    // Валидация входных данных
    if (!name || !telNumber || !userId) {
      return res.status(400).json({ error: "Не все данные предоставлены" });
    }

    let client = null;

    // Поиск клиента в базе данных
    client = await prisma.client.findFirst({
      where: {
        userId: parseInt(userId),
        telNumber,
      },
    });

    if (client) {
      return res.status(200).json(client);
    }

    // Создание нового клиента с учетом необязательного параметра telegramId
    const clientData = {
      name,
      telNumber,
      userId: parseInt(userId),
    };

    // Добавляем telegramId в данные клиента, если он предоставлен
    if (telegramId) {
      clientData.telegramId = telegramId;
    }

    client = await prisma.client.create({
      data: clientData,
    });

    return res.status(200).json(client);
  } catch (error) {
    console.error("Ошибка при добавлении клиента:", error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
};

module.exports = {
  addClient,
};
