const { prisma } = require("../prisma/prisma_client");

const addOrEditContactsInfo = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = req.body;

    if (!data) {
      return res.status(400).json({ error: "Не получены обязательные данные" });
    }

    const contactsInfo = await prisma.contactInfo.upsert({
      where: {
        userId,
      },
      update: {
        ...data,
        userId: userId,
      },
      create: {
        ...data,
        userId: userId,
      },
    });

    if (!contactsInfo) {
      return res.status(500).json({
        error: "Не получилось создать или изменить контактную информацию",
      });
    }

    return res.status(201).json(contactsInfo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Произошла ошибка на сервере" });
  }
};

const getContacts = async (req, res) => {
  try {
    const userId = req.user.id;

    let contactsInfo = await prisma.contactInfo.findMany({
      where: {
        userId,
      },
    });

    if (!contactsInfo) {
      return res.status(400).json({ error: "Нет контактной информации" });
    }

    // Заменяем все null значения на пустые строки
    contactsInfo = contactsInfo.map((info) => {
      return {
        ...info,
        address: info.address || "",
        telNumber: info.telNumber || "",
        instagram: info.instagram || "",
        vk: info.vk || "",
      };
    });

    return res.status(201).json(contactsInfo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Произошла ошибка на сервере" });
  }
};

module.exports = { addOrEditContactsInfo, getContacts };
